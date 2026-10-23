-- Rode no SQL Editor do Supabase (projeto já existente).
-- Acrescenta notas internas, token do chat e tabela de mensagens.

alter table public.leads
  add column if not exists token uuid unique default gen_random_uuid(),
  add column if not exists notas text;

update public.leads set token = gen_random_uuid() where token is null;

create table if not exists public.mensagens (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  autor text not null check (autor in ('admin', 'visitante')),
  texto text not null check (char_length(trim(texto)) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists mensagens_lead_id_idx on public.mensagens (lead_id, created_at);

alter table public.mensagens enable row level security;

drop policy if exists "admin_le_mensagens" on public.mensagens;
create policy "admin_le_mensagens"
  on public.mensagens for select to authenticated using (true);

drop policy if exists "admin_cria_mensagens" on public.mensagens;
create policy "admin_cria_mensagens"
  on public.mensagens for insert to authenticated
  with check (autor = 'admin');

grant select, insert on public.mensagens to authenticated;

-- Visitante acessa a conversa só com o token (não lista os outros leads)
create or replace function public.conversa_por_token(p_token uuid)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  l public.leads%rowtype;
begin
  if p_token is null then
    return null;
  end if;

  select * into l from public.leads where token = p_token;
  if not found then
    return null;
  end if;

  return json_build_object(
    'lead', json_build_object(
      'nome', l.nome,
      'curso', l.curso,
      'turno', l.turno,
      'status', l.status
    ),
    'mensagens', (
      select coalesce(json_agg(json_build_object(
        'id', m.id,
        'autor', m.autor,
        'texto', m.texto,
        'created_at', m.created_at
      ) order by m.created_at), '[]'::json)
      from public.mensagens m
      where m.lead_id = l.id
    )
  );
end;
$$;

create or replace function public.enviar_mensagem_visitante(p_token uuid, p_texto text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  l public.leads%rowtype;
  t text := trim(p_texto);
  m public.mensagens%rowtype;
begin
  if p_token is null or char_length(t) < 1 or char_length(t) > 2000 then
    raise exception 'mensagem inválida';
  end if;

  select * into l from public.leads where token = p_token;
  if not found then
    raise exception 'conversa não encontrada';
  end if;

  insert into public.mensagens (lead_id, autor, texto)
  values (l.id, 'visitante', t)
  returning * into m;

  if l.status = 'novo' then
    update public.leads set status = 'em_conversa' where id = l.id;
  end if;

  return json_build_object(
    'id', m.id,
    'autor', m.autor,
    'texto', m.texto,
    'created_at', m.created_at
  );
end;
$$;

create or replace function public.criar_lead(
  p_nome text,
  p_email text,
  p_telefone text,
  p_curso text,
  p_turno text,
  p_mensagem text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  novo_id uuid;
  novo_token uuid;
begin
  if char_length(trim(p_nome)) < 3
     or p_email !~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
     or char_length(trim(p_telefone)) < 8
     or char_length(trim(p_curso)) < 2 then
    raise exception 'dados inválidos';
  end if;

  insert into public.leads (nome, email, telefone, curso, turno, mensagem, status)
  values (
    trim(p_nome),
    trim(p_email),
    trim(p_telefone),
    trim(p_curso),
    nullif(trim(p_turno), ''),
    nullif(trim(p_mensagem), ''),
    'novo'
  )
  returning id, token into novo_id, novo_token;

  return novo_token;
end;
$$;

grant execute on function public.conversa_por_token(uuid) to anon, authenticated;
grant execute on function public.enviar_mensagem_visitante(uuid, text) to anon, authenticated;
grant execute on function public.criar_lead(text, text, text, text, text, text) to anon, authenticated;
