import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

console.log("URL:", process.env.SUPABASE_URL);
console.log(
  "KEY:",
  process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded" : "Missing",
);

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
