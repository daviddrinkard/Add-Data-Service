import zmq from "zeromq";
import { ROUTES } from "./handlers/index.js";
import "dotenv/config";

console.log("[Worker] Starting worker process...");
console.log("URL:", process.env.SUPABASE_URL);
console.log(
  "KEY:",
  process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing",
);

const pullSock = new zmq.Pull();
const pushSock = new zmq.Push();

async function startWorker() {
  await pullSock.connect("tcp://127.0.0.1:3001");
  await pushSock.connect("tcp://127.0.0.1:3002");
  console.log("Worker connected to tcp://127.0.0.1:3001 and reply 3002");

  while (true) {
    const [msg] = await pullSock.receive();
    const data = JSON.parse(msg.toString());

    console.log("Worker received:", data);

    const result = await handleMessage(data);

    if (data._id) {
      await pushSock.send(JSON.stringify({ id: data._id, ...result }));
    }
  }
}

async function handleMessage(data) {
  const handler = ROUTES[data.appId];

  if (!handler) {
    console.error("No handler found for appId:", data.appId);
    return { ok: false, error: "no handler" };
  }

  try {
    await handler(data);
    return { ok: true };
  } catch (err) {
    console.error("Error in handler:", err);
    return { ok: false, error: err.message };
  }
}

startWorker();
