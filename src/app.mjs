import express from "express";
import { logRequest, validateRoute, handleRoute } from "./module.mjs";

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/add", (req, res) => {
  logRequest(req);
  const route = validateRoute(req);

  // TO-DO: more robust error handling here for responses
  if (route) {
    const routeStatus = handleRoute(req);
    if (routeStatus) {
      res.send(200);
    }
  } else {
    res.send(400);
  }
});
