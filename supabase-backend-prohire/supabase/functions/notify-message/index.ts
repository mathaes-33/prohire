// supabase/functions/notify-message/index.ts
// Example webhook relay for message notifications (Slack/Webhook URL).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export async function serve(req: Request): Promise<Response> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!; // service role for reading webhooks config
  const webhookUrl = Deno.env.get("NOTIFY_WEBHOOK_URL");
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = await req.json();
    // Expect Realtime Webhook from messages insert
    const message = body.record;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `New message from ${message.sender_id}: ${message.body}` }),
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 400 });
  }
}

if (import.meta.main) {
  Deno.serve(serve);
}