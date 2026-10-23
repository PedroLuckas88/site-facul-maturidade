-- Universidade Avante — captação de leads
-- Cole este arquivo no SQL Editor do Supabase (Dashboard → SQL → New query) e rode.

-- Tabela de interessados em matrícula (sem conta de aluno)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text not null,
  curso text not null,
  turno text,
  mensagem text,
  status text not null default 'novo'
    check (status in ('novo', 'em_conversa', 'aprovado', 'recusado', 'arquivado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row
  execute function public.set_updated_at();

-- RLS: visitante só cria lead; leitura/edição fica para usuário autenticado (o admin)
alter table public.leads enable row level security;

drop policy if exists "visitante_cria_lead" on public.leads;
create policy "visitante_cria_lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (
    char_length(trim(nome)) >= 3
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
    and char_length(trim(telefone)) >= 8
    and char_length(trim(curso)) >= 2
    and status = 'novo'
  );

drop policy if exists "admin_le_leads" on public.leads;
create policy "admin_le_leads"
  on public.leads
  for select
  to authenticated
  using (true);

drop policy if exists "admin_atualiza_leads" on public.leads;
create policy "admin_atualiza_leads"
  on public.leads
  for update
  to authenticated
  using (true)
  with check (true);

-- Visitante anônimo não lê, não atualiza e não apaga.
revoke all on public.leads from public;
grant insert on public.leads to anon;
grant select, insert, update on public.leads to authenticated;
