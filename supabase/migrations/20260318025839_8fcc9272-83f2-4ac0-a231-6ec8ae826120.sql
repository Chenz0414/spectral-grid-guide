-- Temporary admin session gate for /admin access
create extension if not exists pgcrypto;

create table if not exists public.admin_sessions (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  constraint admin_sessions_phone_length check (char_length(phone) between 6 and 32),
  constraint admin_sessions_token_hash_length check (char_length(token_hash) >= 32)
);

create index if not exists idx_admin_sessions_expires_at on public.admin_sessions (expires_at);

alter table public.admin_sessions enable row level security;

create or replace function public.cleanup_expired_admin_sessions()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.admin_sessions where expires_at <= now();
$$;