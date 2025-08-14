// supabase/functions/sync-webhook/index.ts
// Generic inbound webhook -> write audit log.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export async function serve(req: Request): Promise<Response> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const event = await req.json();
    const { actor_id, action, entity, entity_id, meta } = event;
    const { error } = await supabase.from("audit_logs").insert({ actor_id, action, entity, entity_id, meta });
    if (error) throw error;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 400 });
  }
}

if (import.meta.main) {
  Deno.serve(serve);
}