import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/auth-context'
import '../../styles/admin.css'
import '../../styles/chat.css'

const STATUS = [
  { valor: 'novo', rotulo: 'Novo' },
  { valor: 'em_conversa', rotulo: 'Em conversa' },
  { valor: 'aprovado', rotulo: 'Aprovado' },
  { valor: 'recusado', rotulo: 'Recusado' },
  { valor: 'arquivado', rotulo: 'Arquivado' },
]

const rotuloStatus = (valor) => STATUS.find((s) => s.valor === valor)?.rotulo ?? valor

const formatarTelefone = (valor) => {
  const d = String(valor || '').replace(/\D/g, '')
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return valor || '—'
}

const formatarData = (iso) =>
  new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

const linkWhatsApp = (telefone) => {
  const d = String(telefone || '').replace(/\D/g, '')
  if (d.length < 10) return null
  const comPais = d.startsWith('55') ? d : `55${d}`
  return `https://wa.me/${comPais}`
}

export default function AdminPainel() {
  const { usuario, carregando, sair } = useAuth()
  const [leads, setLeads] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')
  const [selecionado, setSelecionado] = useState(null)
  const [erro, setErro] = useState('')
  const [carregandoLista, setCarregandoLista] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [notas, setNotas] = useState('')
  const [mensagens, setMensagens] = useState([])
  const [textoChat, setTextoChat] = useState('')

  useEffect(() => {
    if (!usuario || !supabase) return undefined

    let ativo = true
    const carregar = async () => {
      setCarregandoLista(true)
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      if (!ativo) return
      if (error) {
        setErro('Não foi possível carregar os interessados.')
        setLeads([])
      } else {
        setErro('')
        setLeads(data ?? [])
      }
      setCarregandoLista(false)
    }

    carregar()
    return () => { ativo = false }
  }, [usuario])

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return leads.filter((lead) => {
      const statusOk = filtro === 'todos' || lead.status === filtro
      const texto = `${lead.nome} ${lead.email} ${lead.telefone} ${lead.curso}`.toLowerCase()
      return statusOk && (!termo || texto.includes(termo))
    })
  }, [leads, filtro, busca])

  const atualizarStatus = async (id, status) => {
    setSalvando(true)
    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    setSalvando(false)
    if (error) {
      setErro('Não foi possível atualizar o status.')
      return
    }
    setLeads((lista) => lista.map((item) => (item.id === id ? data : item)))
    setSelecionado(data)
  }

  const abrirLead = async (lead) => {
    setSelecionado(lead)
    setNotas(lead.notas || '')
    setTextoChat('')
    const { data } = await supabase
      .from('mensagens')
      .select('*')
      .eq('lead_id', lead.id)
      .order('created_at')
    setMensagens(data ?? [])
  }

  const salvarNotas = async () => {
    if (!selecionado) return
    setSalvando(true)
    const { data, error } = await supabase
      .from('leads')
      .update({ notas })
      .eq('id', selecionado.id)
      .select()
      .single()
    setSalvando(false)
    if (error) {
      setErro('Não foi possível salvar as notas.')
      return
    }
    setLeads((lista) => lista.map((item) => (item.id === selecionado.id ? data : item)))
    setSelecionado(data)
  }

  const enviarMensagem = async (ev) => {
    ev.preventDefault()
    const t = textoChat.trim()
    if (!t || !selecionado) return
    const { data, error } = await supabase
      .from('mensagens')
      .insert({ lead_id: selecionado.id, autor: 'admin', texto: t })
      .select()
      .single()
    if (error) {
      setErro('Não foi possível enviar a mensagem.')
      return
    }
    setTextoChat('')
    setMensagens((lista) => [...lista, data])
    if (selecionado.status === 'novo') atualizarStatus(selecionado.id, 'em_conversa')
  }

  if (carregando) return <p className="admin-status">Carregando...</p>
  if (!usuario) return <Navigate to="/secretaria/login" replace />

  const detalhe = selecionado && leads.find((l) => l.id === selecionado.id)

  return (
    <div className="admin">
      <header className="admin-topo">
        <div>
          <span className="eyebrow">SECRETARIA</span>
          <h1>Interessados em matrícula</h1>
        </div>
        <div className="admin-topo-acoes">
          <span className="admin-email">{usuario.email}</span>
          <button type="button" className="btn btn-borda" onClick={sair}>Sair</button>
        </div>
      </header>

      <div className="admin-filtros">
        <input
          type="search"
          placeholder="Buscar por nome, e-mail, telefone ou curso"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <div className="chips">
          <button type="button" className={`chip ${filtro === 'todos' ? 'ativo' : ''}`} onClick={() => setFiltro('todos')}>
            Todos ({leads.length})
          </button>
          {STATUS.map((s) => (
            <button
              key={s.valor}
              type="button"
              className={`chip ${filtro === s.valor ? 'ativo' : ''}`}
              onClick={() => setFiltro(s.valor)}
            >
              {s.rotulo} ({leads.filter((l) => l.status === s.valor).length})
            </button>
          ))}
        </div>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <div className="admin-corpo">
        <section className="admin-lista">
          {carregandoLista ? (
            <p>Carregando lista...</p>
          ) : filtrados.length === 0 ? (
            <p>Nenhum interessado neste filtro.</p>
          ) : (
            <ul>
              {filtrados.map((lead) => (
                <li key={lead.id}>
                  <button
                    type="button"
                    className={`admin-card ${detalhe?.id === lead.id ? 'ativo' : ''}`}
                    onClick={() => abrirLead(lead)}
                  >
                    <strong>{lead.nome}</strong>
                    <span>{lead.curso} · {lead.turno || 'sem turno'}</span>
                    <em className={`badge badge-${lead.status}`}>{rotuloStatus(lead.status)}</em>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="admin-detalhe">
          {!detalhe ? (
            <p>Selecione um interessado à esquerda.</p>
          ) : (
            <>
              <h2>{detalhe.nome}</h2>
              <p className="admin-meta">{formatarData(detalhe.created_at)}</p>
              <dl>
                <div><dt>E-mail</dt><dd><a href={`mailto:${detalhe.email}`}>{detalhe.email}</a></dd></div>
                <div>
                  <dt>Telefone</dt>
                  <dd>
                    {formatarTelefone(detalhe.telefone)}
                    {linkWhatsApp(detalhe.telefone) && (
                      <> · <a href={linkWhatsApp(detalhe.telefone)} target="_blank" rel="noreferrer">WhatsApp</a></>
                    )}
                  </dd>
                </div>
                <div><dt>Curso</dt><dd>{detalhe.curso}</dd></div>
                <div><dt>Turno</dt><dd>{detalhe.turno || '—'}</dd></div>
                <div><dt>Mensagem</dt><dd>{detalhe.mensagem || '—'}</dd></div>
              </dl>

              <label className="admin-status-campo">
                Status
                <select
                  value={detalhe.status}
                  disabled={salvando}
                  onChange={(e) => atualizarStatus(detalhe.id, e.target.value)}
                >
                  {STATUS.map((s) => <option key={s.valor} value={s.valor}>{s.rotulo}</option>)}
                </select>
              </label>

              <label className="admin-status-campo">
                Notas internas (só a secretaria vê)
                <textarea rows="3" value={notas} onChange={(e) => setNotas(e.target.value)} />
              </label>
              <button type="button" className="btn btn-escuro" onClick={salvarNotas} disabled={salvando}>
                Salvar notas
              </button>

              {detalhe.token && (
                <p className="admin-meta">
                  Link do interessado:{' '}
                  <a href={`/conversa/${detalhe.token}`}>{`${window.location.origin}/conversa/${detalhe.token}`}</a>
                </p>
              )}

              <h3 className="admin-chat-titulo">Conversa</h3>
              <div className="chat-janela">
                <ol className="chat-lista chat-eu-admin">
                  {mensagens.length === 0 && <li className="chat-vazio">Nenhuma mensagem ainda.</li>}
                  {mensagens.map((m) => (
                    <li key={m.id} className={`chat-linha ${m.autor}`}>
                      <div className="chat-bolha">
                        <span>{m.autor === 'admin' ? 'Você' : detalhe.nome.trim().split(/\s+/)[0]}</span>
                        <p>{String(m.texto || '').trim()}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <form className="chat-form" onSubmit={enviarMensagem}>
                  <textarea
                    rows="1"
                    value={textoChat}
                    onChange={(e) => setTextoChat(e.target.value)}
                    placeholder="Mensagem"
                    maxLength={2000}
                  />
                  <button className="btn btn-escuro" disabled={!textoChat.trim()}>Enviar</button>
                </form>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
