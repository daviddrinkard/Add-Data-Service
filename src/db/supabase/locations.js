import { supabase } from "./client.js";
import { retry } from "../../utils/retry.js";

export async function insertLocation(payload) {
  return retry(
    async () => {
      const { data, error } = await supabase
        .from("locations")
        .insert(payload)
        .select();

      if (error) {
        console.error("[Supabase] Insert error:", error);
        throw error;
      }

      console.log("[Supabase] Insert success:", data);
      return data;
    },
    {
      retries: 5,
      delay: 500,
      backoff: 2,
    },
  );
}
