import zmq from "zeromq";

const sock = new zmq.Push();

async function init() {
  await sock.bind("tcp://127.0.0.1:3001");
  console.log("ZeroMQ PUSH socket bounce to tcp://127.0.0.1:3001");
}

init();

export async function publishMessage(data) {
  const msg = JSON.stringify(data);
  await sock.send(msg);
  console.log("Message seng: ", msg);
}
