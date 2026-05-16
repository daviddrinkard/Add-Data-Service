import zmq from "zeromq";
import { ROUTES } from "./handlers/index.js";
import "dotenv/config";

console.log("[Worker] Starting worker process...");
console.log("URL:", process.env.SUPABASE_URL);
console.log(
  "KEY:",
  process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing",
);

const sock = new zmq.Pull();

async function startWorker() {
  await sock.connect("tcp://127.0.0.1:3001");
  console.log("Worker connected to tcp://127.0.0.1:3001");

  while (true) {
    const [msg] = await sock.receive();
    const data = JSON.parse(msg.toString());

    console.log("Worker received:", data);

    await handleMessage(data);
  }
}

async function handleMessage(data) {
  const handler = ROUTES[data.appId];

  if (!handler) {
    console.error("No handler found for appId:", data.appId);
    return;
  }

  try {
    await handler(data);
  } catch (err) {
    console.error("Error in handler:", err);
  }
}

startWorker();
