import { retry } from "../utils/retry.js";
import { AppACollection } from "../db/mongo/appA.model.js";
import { appASchema } from "../schemas/appA.schema.js";

export async function handleAppA(data) {
  const payload = appASchema.parse(data);

  await retry(() => AppACollection.create(payload), {
    retries: 5,
    delay: 300,
    backoff: 2,
  });

  console.log("App A write complete");
}
