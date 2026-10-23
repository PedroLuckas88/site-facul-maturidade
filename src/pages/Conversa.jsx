import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase, supabaseConfigurado } from '../lib/supabase'
import '../styles/paginas.css'
import '../styles/chat.css'

const rotuloStatus = {
  novo: 'Recebemos seu interesse',
  em_conversa: 'Em conversa com a secretaria',
  aprovado: 'Matrícula em andamento',
  recusado: 'Não seguimos com esta solicitação',
  arquivado: 'Conversa encerrada',
}

export default function Conversa() {
  const { token } = useParams()
  const [lead, setLead] = useState(null)
  const [mensagens, setMensagens] = useState([])
  const [texto, setTexto] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)

  const carregar = useCallback(async () => {
    if (!supabaseConfigurado) {
      setErro('Conversa indisponível no momento.')
      setCarregando(false)
      return
    }
    const { data, error } = await supabase.rpc('conversa_por_token', { p_token: token })
    if (error || !data) {
      setLead(null)
      setErro('Não encontramos esta conversa. Confira o link.')
    } else {
      setLead(data.lead)
      setMensagens(data.mensagens ?? [])
      setErro('')
    }
    setCarregando(false)
  }, [token])

  useEffect(() => {
    const imediato = setTimeout(carregar, 0)
    const id = setInterval(carregar, 8000)
    return () => {
      clearTimeout(imediato)
      clearInterval(id)
    }
  }, [carregar])

  const enviar = async (ev) => {
    ev.preventDefault()
    const t = texto.trim()
    if (!t) return
    setEnviando(true)
    const { data, error } = await supabase.rpc('enviar_mensagem_visitante', {
      p_token: token,
      p_texto: t,
    })
    setEnviando(false)
    if (error) {
      setErro('Não foi possível enviar. Tente de novo.')
      return
    }
    setTexto('')
    setMensagens((lista) => [...lista, data])
  }

  if (carregando) {
    return (
      <section className="secao secao-clara pagina">
        <p>Abrindo conversa...</p>
      </section>
    )
  }

  if (!lead) {
    return (
      <section className="secao secao-clara pagina">
        <h2>Conversa não encontrada</h2>
        <p className="texto">{erro}</p>
      </section>
    )
  }

  return (
    <section className="secao secao-clara pagina conversa">
      <div className="conversa-topo">
        <span className="eyebrow">SUA CONVERSA COM A AVANTE</span>
        <h2>{lead.curso}</h2>
        <p className="texto">
          Olá, {lead.nome.split(/\s+/)[0]}. {rotuloStatus[lead.status] || ''}
          {lead.turno ? ` · Turno: ${lead.turno}` : ''}
        </p>
      </div>
      {erro && <p className="erro">{erro}</p>}

      <div className="chat-janela">
        <ol className="chat-lista chat-eu-visitante">
          {mensagens.length === 0 && <li className="chat-vazio">Ainda não há mensagens. Escreva abaixo para a secretaria.</li>}
          {mensagens.map((m) => (
            <li key={m.id} className={`chat-linha ${m.autor}`}>
              <div className="chat-bolha">
                <span>{m.autor === 'admin' ? 'Secretaria' : 'Você'}</span>
                <p>{String(m.texto || '').trim()}</p>
              </div>
            </li>
          ))}
        </ol>
        <form className="chat-form" onSubmit={enviar}>
          <textarea
            rows="1"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Mensagem"
            maxLength={2000}
          />
          <button className="btn btn-escuro" disabled={enviando || !texto.trim()}>
            {enviando ? '...' : 'Enviar'}
          </button>
        </form>
      </div>
      <p className="chat-aviso">Guarde este link. É o único jeito de voltar nesta conversa, sem criar conta.</p>
    </section>
  )
}
