import { locationSchema } from "../schemas/location.schema.js";
import { insertLocation } from "../db/supabase/locations.js";

export async function handleAppC(data) {
  console.log("[App C] Received:", data);

  // Validate incoming payload
  const payload = locationSchema.parse(data.data);

  // Insert with retry logic
  await insertLocation(payload);

  return { status: 200 };
}
