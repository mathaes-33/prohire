-- supabase/migrations/0001_init_prohire.sql
-- Generated: 2025-08-14T12:00:34.358044Z
-- Domain: hiring & staffing platform

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Auth-linked profile
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  role text check (role in ('candidate','employer','agency','admin')) not null default 'candidate',
  company_id uuid,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Companies (for employers & agencies)
create table if not exists public.companies (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) on delete set null,
  name text not null,
  type text check (type in ('employer','agency')) not null,
  website text,
  bio text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Link profiles to companies (many-to-many to allow teams)
create table if not exists public.company_members (
  company_id uuid references public.companies(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text check (role in ('owner','admin','member')) not null default 'member',
  created_at timestamp with time zone default now(),
  primary key (company_id, user_id)
);

-- Job posts
create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references public.companies(id) on delete cascade,
  title text not null,
  description text not null,
  location text,
  employment_type text check (employment_type in ('full-time','part-time','contract','internship','temporary')),
  salary_min numeric,
  salary_max numeric,
  currency text default 'USD',
  is_remote boolean default false,
  status text check (status in ('draft','open','closed','paused')) not null default 'open',
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  search_tsv tsvector
);

-- Applications
create table if not exists public.applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references public.jobs(id) on delete cascade,
  candidate_id uuid references auth.users(id) on delete cascade,
  cover_letter text,
  resume_url text,
  status text check (status in ('submitted','review','interview','offer','hired','rejected','withdrawn')) not null default 'submitted',
  source text, -- referral, job board, etc.
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(job_id, candidate_id)
);

-- Messaging between candidate and company (via agency optional)
create table if not exists public.threads (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references public.jobs(id) on delete set null,
  company_id uuid references public.companies(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now()
);

create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  thread_id uuid references public.threads(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  body text not null,
  created_at timestamp with time zone default now(),
  read_by uuid[] default '{}'
);

-- Interviews
create table if not exists public.interviews (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references public.applications(id) on delete cascade,
  scheduled_at timestamp with time zone,
  duration_minutes integer default 30,
  location text, -- URL or address
  notes text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default now()
);

-- Offers / Contracts (simplified)
create table if not exists public.offers (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references public.applications(id) on delete cascade,
  salary numeric,
  currency text default 'USD',
  start_date date,
  notes text,
  status text check (status in ('draft','sent','accepted','declined','expired')) not null default 'draft',
  created_at timestamp with time zone default now()
);

-- Audit logs
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid,
  meta jsonb,
  created_at timestamp with time zone default now()
);

-- Triggers
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name',''), new.raw_user_meta_data->>'avatar_url', 'candidate')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Search vector
create or replace function public.jobs_tsvector_trigger() returns trigger as $$
begin
  new.search_tsv :=
    setweight(to_tsvector('english', coalesce(new.title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.description,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.location,'')), 'C');
  return new;
end;
$$ language plpgsql;

drop trigger if exists jobs_tsvector_update on public.jobs;
create trigger jobs_tsvector_update
  before insert or update on public.jobs
  for each row execute procedure public.jobs_tsvector_trigger();

create index if not exists idx_jobs_tsv on public.jobs using gin (search_tsv);

-- RLS
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.threads enable row level security;
alter table public.messages enable row level security;
alter table public.interviews enable row level security;
alter table public.offers enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles policies
create policy "Profiles are viewable by self and admins"
  on public.profiles for select
  using (auth.uid() = id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Companies
create policy "Company readable by members"
  on public.companies for select
  using (exists (select 1 from public.company_members m where m.company_id = id and m.user_id = auth.uid()));

create policy "Company insert by authenticated"
  on public.companies for insert
  with check (auth.role() = 'authenticated');

create policy "Company update by owner/admin"
  on public.companies for update
  using (exists (
    select 1 from public.company_members m
    where m.company_id = id and m.user_id = auth.uid() and m.role in ('owner','admin')
  ));

-- Company members
create policy "Members readable by company members"
  on public.company_members for select
  using (exists (select 1 from public.company_members m where m.company_id = company_id and m.user_id = auth.uid()));

create policy "Add members by owner/admin"
  on public.company_members for insert
  with check (exists (select 1 from public.company_members m where m.company_id = company_id and m.user_id = auth.uid() and m.role in ('owner','admin')));

create policy "Remove/update members by owner/admin"
  on public.company_members for update
  using (exists (select 1 from public.company_members m where m.company_id = company_id and m.user_id = auth.uid() and m.role in ('owner','admin')));

-- Jobs
create policy "Jobs readable by all (public marketplace)"
  on public.jobs for select using (true);

create policy "Create jobs by company members (employer/agency)"
  on public.jobs for insert
  with check (exists (
    select 1 from public.company_members m
    where m.company_id = company_id and m.user_id = auth.uid()
  ));

create policy "Update jobs by company members"
  on public.jobs for update
  using (exists (
    select 1 from public.company_members m
    where m.company_id = company_id and m.user_id = auth.uid()
  ));

-- Applications
create policy "Candidate can view own applications"
  on public.applications for select
  using (candidate_id = auth.uid());

create policy "Company members can view applications for their jobs"
  on public.applications for select
  using (exists (
    select 1 from public.jobs j
    join public.company_members m on m.company_id = j.company_id and m.user_id = auth.uid()
    where j.id = job_id
  ));

create policy "Candidate can create application"
  on public.applications for insert
  with check (candidate_id = auth.uid());

create policy "Candidate can update/withdraw before hired"
  on public.applications for update
  using (candidate_id = auth.uid() and status != 'hired');

create policy "Company can update application status"
  on public.applications for update
  using (exists (
    select 1 from public.jobs j
    join public.company_members m on m.company_id = j.company_id and m.user_id = auth.uid()
    where j.id = job_id
  ));

-- Threads & Messages
create policy "Threads readable by participants"
  on public.threads for select
  using (
    exists (select 1 from public.company_members m where m.company_id = company_id and m.user_id = auth.uid())
    or created_by = auth.uid()
  );

create policy "Create thread by company member or candidate"
  on public.threads for insert
  with check (
    exists (select 1 from public.company_members m where m.company_id = company_id and m.user_id = auth.uid())
    or created_by = auth.uid()
  );

create policy "Messages readable by thread participants"
  on public.messages for select
  using (
    exists (
      select 1 from public.threads t
      left join public.company_members m on m.company_id = t.company_id and m.user_id = auth.uid()
      where t.id = thread_id and (m.user_id is not null or t.created_by = auth.uid())
    )
  );

create policy "Send message by thread participants"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.threads t
      left join public.company_members m on m.company_id = t.company_id and m.user_id = auth.uid()
      where t.id = thread_id and (m.user_id is not null or t.created_by = auth.uid())
    )
  );

-- Interviews
create policy "Interviews visible to candidate and company"
  on public.interviews for select
  using (
    exists (
      select 1 from public.applications a
      join public.jobs j on j.id = a.job_id
      left join public.company_members m on m.company_id = j.company_id and m.user_id = auth.uid()
      where a.id = application_id and (a.candidate_id = auth.uid() or m.user_id is not null)
    )
  );

create policy "Create/update interviews by company"
  on public.interviews for insert with check (
    exists (
      select 1 from public.applications a
      join public.jobs j on j.id = a.job_id
      join public.company_members m on m.company_id = j.company_id and m.user_id = auth.uid()
      where a.id = application_id
    )
  );
create policy "Update interviews by company"
  on public.interviews for update using (
    exists (
      select 1 from public.applications a
      join public.jobs j on j.id = a.job_id
      join public.company_members m on m.company_id = j.company_id and m.user_id = auth.uid()
      where a.id = application_id
    )
  );

-- Offers
create policy "Offers visible to candidate and company"
  on public.offers for select using (
    exists (
      select 1 from public.applications a
      join public.jobs j on j.id = a.job_id
      left join public.company_members m on m.company_id = j.company_id and m.user_id = auth.uid()
      where a.id = application_id and (a.candidate_id = auth.uid() or m.user_id is not null)
    )
  );

create policy "Create/update offers by company"
  on public.offers for insert with check (
    exists (
      select 1 from public.applications a
      join public.jobs j on j.id = a.job_id
      join public.company_members m on m.company_id = j.company_id and m.user_id = auth.uid()
      where a.id = application_id
    )
  );
create policy "Update offers by company"
  on public.offers for update using (
    exists (
      select 1 from public.applications a
      join public.jobs j on j.id = a.job_id
      join public.company_members m on m.company_id = j.company_id and m.user_id = auth.uid()
      where a.id = application_id
    )
  );

-- Audit logs (read by admins)
create policy "Audit logs readable by admins"
  on public.audit_logs for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Helper views
create or replace view public.v_job_with_company as
  select j.*, c.name as company_name, c.type as company_type
  from public.jobs j
  join public.companies c on c.id = j.company_id;