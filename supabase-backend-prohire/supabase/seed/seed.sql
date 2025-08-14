
-- supabase/seed/seed.sql
-- Example seed data
insert into public.companies (name, type) values
 ('Acme Corp','employer'),
 ('TalentBridge','agency')
on conflict do nothing;

-- Add a sample open job tied to the first company (if exists)
insert into public.jobs (company_id, title, description, location, employment_type, salary_min, salary_max, is_remote)
select c.id, 'Full-Stack Engineer', 'Build delightful web apps.', 'Toronto, ON', 'full-time', 110000, 150000, true
from public.companies c
where c.name = 'Acme Corp'
on conflict do nothing;
