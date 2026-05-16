import { z } from "zod";

export const appASchema = z.object({
  appId: z.literal("app-A"),
  userId: z.string(),
  email: z.string().email(),
  createdAt: z.string().optional(),
});
