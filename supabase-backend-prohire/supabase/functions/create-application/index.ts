// supabase/functions/create-application/index.ts
// Create an application and thread message atomically.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export async function serve(req: Request): Promise<Response> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey, { global: { headers: { Authorization: req.headers.get("Authorization")! } } });
  try {
    const payload = await req.json();
    const { job_id, cover_letter, resume_url } = payload;

    const { data: user, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user?.user) throw userErr ?? new Error("Not authenticated");
    const candidate_id = user.user.id;

    const { data: app, error: appErr } = await supabase
      .from("applications")
      .insert({ job_id, candidate_id, cover_letter, resume_url })
      .select()
      .single();
    if (appErr) throw appErr;

    return new Response(JSON.stringify({ application: app }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 400 });
  }
}

if (import.meta.main) {
  Deno.serve(serve);
}