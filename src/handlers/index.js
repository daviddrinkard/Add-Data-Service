import { handleAppA } from "./appA.js";
import { handleAppB } from "./appB.js";
import { handleAppC } from "./appC.js";

export const ROUTES = {
  "app-A": handleAppA,
  "app-B": handleAppB,
  "app-C": handleAppC,
};
