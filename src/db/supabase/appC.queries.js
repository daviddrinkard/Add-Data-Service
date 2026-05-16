import { supabase } from "./client.js";

export async function insertSession(payload) {
  return supabase.from("sessions").insert({
    session_id: payload.sessionId,
    metadata: payload.metadata,
    created_at: new Date(),
  });
}
