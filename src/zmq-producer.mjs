import zmq from "zeromq";
import { randomUUID } from "crypto";

const pushSock = new zmq.Push();
const pullSock = new zmq.Pull();

const pending = new Map(); // id -> { resolve, timer }
const REPLY_TIMEOUT_MS = 10_000;

let sending = Promise.resolve(); // internal send queue
let queueLength = 0;

async function init() {
  try {
    await pushSock.bind("tcp://127.0.0.1:3001");
    console.log("[ZMQ] PUSH socket bound to tcp://127.0.0.1:3001");

    await pullSock.bind("tcp://127.0.0.1:3002");
    console.log("[ZMQ] PULL (reply) socket bound to tcp://127.0.0.1:3002");

    listenForReplies();
  } catch (err) {
    console.error("[ZMQ] Failed to bind socket:", err);
  }
}

async function listenForReplies() {
  for await (const [msg] of pullSock) {
    try {
      const { id, ok, error } = JSON.parse(msg.toString());
      const entry = pending.get(id);
      if (!entry) {
        console.warn("[ZMQ] Reply for unknown id:", id);
        continue;
      }
      clearTimeout(entry.timer);
      pending.delete(id);
      entry.resolve({ ok, error });
    } catch (err) {
      console.error("[ZMQ] Bad reply message:", err);
    }
  }
}

init();

export function publishMessage(data) {
  const id = randomUUID();
  const payload = { ...data, _id: id };
  const msg = JSON.stringify(payload);

  console.log("[ZMQ] Enqueue send:", msg);
  queueLength++;
  console.log("[ZMQ] Queue length:", queueLength);

  const replyPromise = new Promise((resolve) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      resolve({ ok: false, error: "timeout" });
    }, REPLY_TIMEOUT_MS);
    pending.set(id, { resolve, timer });
  });

  sending = sending.then(async () => {
    console.log("[ZMQ] Starting send:", msg);

    try {
      await pushSock.send(msg);
      console.log("[ZMQ] Send complete:", msg);
    } catch (err) {
      console.error("[ZMQ] Send failed:", err);
      const entry = pending.get(id);
      if (entry) {
        clearTimeout(entry.timer);
        pending.delete(id);
        entry.resolve({ ok: false, error: "send failed" });
      }
    } finally {
      queueLength--;
      console.log("[ZMQ] Queue length now:", queueLength);
    }
  });

  return replyPromise;
}
