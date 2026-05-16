import express from "express";
import { logRequest, validateRoute, handleRoute } from "./module.mjs";
import { publishMessage } from "./zmq-producer.mjs";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/add", async (req, res) => {
  logRequest(req);
  if (!validateRoute(req)) {
    return res.sendStatus(400);
  }

  await publishMessage(req.body);

  return res.sendStatus(200);
});
