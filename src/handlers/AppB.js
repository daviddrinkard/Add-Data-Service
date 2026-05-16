import { retry } from "../utils/retry.js";
import { AppBCollection } from "../db/mongo/appB.model.js";
import { appBSchema } from "../schemas/appB.schema.js";

export async function handleAppB(data) {
  const payload = appBSchema.parse(data);

  await retry(() => AppBCollection.create(payload), {
    retries: 4,
    delay: 200,
    backoff: 2,
  });

  console.log("App B write complete");
}
