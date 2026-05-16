import { z } from "zod";

export const appCSchema = z.object({
  appId: z.literal("app-C"),
  sessionId: z.string(),
  metadata: z.record(z.any()),
});
