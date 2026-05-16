import { retry } from "../utils/retry.js";
import { insertSession } from "../db/supabase/appC.queries.js";
import { appCSchema } from "../schemas/appC.schema.js";

export async function handleAppC(data) {
  const payload = appCSchema.parse(data);

  await retry(() => insertSession(payload), {
    retries: 6,
    delay: 400,
    backoff: 1.8,
  });

  console.log("App C write complete");
}
