import { handleAppA } from "./appA.js";
import { handleAppB } from "./appB.js";
import { handleAppC } from "./appC.js";

export const ROUTES = {
  "app-A": handleAppA,
  "app-B": handleAppB,
  "app-C": handleAppC,
};

// handlers/index.js
export async function handleAppA(data) {
  console.log("Handling App A:", data);
  // TODO: write to Postgres, Mongo, etc.
}

export async function handleAppB(data) {
  console.log("Handling App B:", data);
  // TODO: write to Redis, etc.
}

export async function handleAppC(data) {
  console.log("Handling App C:", data);
  // TODO: write to MySQL, etc.
}
