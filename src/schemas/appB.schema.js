import { z } from "zod";

export const appBSchema = z.object({
  appId: z.literal("app-B"),
  productId: z.string(),
  quantity: z.number(),
});
