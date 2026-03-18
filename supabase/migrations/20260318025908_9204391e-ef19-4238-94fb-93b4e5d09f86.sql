create policy "No direct select access to admin_sessions"
on public.admin_sessions
for select
using (false);

create policy "No direct insert access to admin_sessions"
on public.admin_sessions
for insert
with check (false);

create policy "No direct update access to admin_sessions"
on public.admin_sessions
for update
using (false)
with check (false);

create policy "No direct delete access to admin_sessions"
on public.admin_sessions
for delete
using (false);