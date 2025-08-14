// src/lib/services.ts
import { supabase } from "./supabaseClient";

export async function getJobs(query?: { q?: string; limit?: number; }) {
  let req = supabase.from("v_job_with_company").select("*").eq("status","open");
  if (query?.q) {
    req = supabase.from("jobs").select("*")
      .textSearch("search_tsv", query.q, { type: "websearch" });
  }
  if (query?.limit) (req as any).limit(query.limit);
  const { data, error } = await req;
  if (error) throw error;
  return data;
}

export async function createJob(input: any) {
  const { data, error } = await supabase.from("jobs").insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function applyToJob(job_id: string, payload: { cover_letter?: string; resume_url?: string }) {
  const { data: app, error } = await supabase.functions.invoke("create-application", {
    body: { job_id, ...payload },
  });
  if (error) throw error;
  return (app as any).application;
}

export async function sendMessage(thread_id: string, body: string) {
  const { data, error } = await supabase.from("messages").insert({ thread_id, body }).select().single();
  if (error) throw error;
  return data;
}