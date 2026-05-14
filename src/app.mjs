import express from "express";
import { logRequest } from "./module.mjs";

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// main path for adding resources
app.get("/add", (req, res) => {
  res.send(200);
});

app.post("/add", (req, res) => {
  res.send("POSTED.");
  logRequest(req);
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// curl -X POST http://localhost:3000/add \
//   -H "Content-Type: application/json" \
//   -d '{"name":"example","value":123}'
