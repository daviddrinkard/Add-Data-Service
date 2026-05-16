import zmq from "zeromq";

const sock = new zmq.Push();
let sending = Promise.resolve(); // internal send queue
let queueLength = 0;

async function init() {
  try {
    await sock.bind("tcp://127.0.0.1:3001");
    console.log("[ZMQ] PUSH socket bound to tcp://127.0.0.1:3001");
  } catch (err) {
    console.error("[ZMQ] Failed to bind socket:", err);
  }
}

init();

export function publishMessage(data) {
  const msg = JSON.stringify(data);

  console.log("[ZMQ] Enqueue send:", msg);
  queueLength++;
  console.log("[ZMQ] Queue length:", queueLength);

  // Chain sends so they run sequentially
  sending = sending.then(async () => {
    console.log("[ZMQ] Starting send:", msg);

    try {
      await sock.send(msg);
      console.log("[ZMQ] Send complete:", msg);
    } catch (err) {
      console.error("[ZMQ] Send failed:", err);
    } finally {
      queueLength--;
      console.log("[ZMQ] Queue length now:", queueLength);
    }
  });

  return sending;
}
