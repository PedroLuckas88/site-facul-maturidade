import { useState } from 'react'
import { cursos, turnos } from '../data/cursos'
import { supabase, supabaseConfigurado } from '../lib/supabase'
import '../styles/paginas.css'

const inicial = { nome: '', email: '', telefone: '', curso: '', turno: '', mensagem: '' }

const soNumeros = (valor) => valor.replace(/\D/g, '')

export default function Contato() {
  const [form, setForm] = useState(inicial)
  const [erros, setErros] = useState({})
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [linkConversa, setLinkConversa] = useState('')

  const alterar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validar = () => {
    const e = {}
    if (form.nome.trim().length < 3) e.nome = 'Digite seu nome completo.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Digite um e-mail válido.'
    const digitos = soNumeros(form.telefone)
    if (digitos.length < 10 || digitos.length > 11) e.telefone = 'Digite um telefone com DDD (10 ou 11 dígitos).'
    if (!form.curso) e.curso = 'Escolha um curso.'
    if (!form.turno) e.turno = 'Escolha um turno.'
    return e
  }

  const enviar = async (ev) => {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    if (Object.keys(e).length > 0) return

    if (!supabaseConfigurado) {
      setErros({ geral: 'O envio ainda não está configurado. Fale com a secretaria.' })
      return
    }

    setEnviando(true)
    const { data, error } = await supabase.rpc('criar_lead', {
      p_nome: form.nome.trim(),
      p_email: form.email.trim(),
      p_telefone: soNumeros(form.telefone),
      p_curso: form.curso,
      p_turno: form.turno,
      p_mensagem: form.mensagem.trim(),
    })
    setEnviando(false)

    if (error || !data) {
      setErros({ geral: 'Não foi possível enviar agora. Tente de novo em instantes.' })
      return
    }

    setLinkConversa(`${window.location.origin}/conversa/${data}`)
    setEnviado(true)
    setForm(inicial)
  }

  return (
    <section className="secao secao-clara pagina">
      <span className="eyebrow">CONTATO</span>
      <h2>Quero me matricular</h2>
      <p className="texto">Deixe seus dados. A secretaria entra em contato para falar de valores, turno e matrícula.</p>

      {enviado ? (
        <div className="sucesso">
          <p>Recebemos seus dados! Guarde o link abaixo para conversar com a secretaria sobre valores e matrícula.</p>
          {linkConversa && (
            <p><a href={linkConversa}>{linkConversa}</a></p>
          )}
        </div>
      ) : (
        <form className="form" onSubmit={enviar} noValidate>
          {erros.geral && <p className="erro">{erros.geral}</p>}

          <label>Nome
            <input name="nome" value={form.nome} onChange={alterar} autoComplete="name" />
            {erros.nome && <span className="erro">{erros.nome}</span>}
          </label>

          <label>E-mail
            <input name="email" type="email" value={form.email} onChange={alterar} autoComplete="email" />
            {erros.email && <span className="erro">{erros.email}</span>}
          </label>

          <label>Telefone / WhatsApp
            <input
              name="telefone"
              type="tel"
              inputMode="tel"
              placeholder="(11) 99999-9999"
              value={form.telefone}
              onChange={alterar}
              autoComplete="tel"
            />
            {erros.telefone && <span className="erro">{erros.telefone}</span>}
          </label>

          <label>Curso de interesse
            <select name="curso" value={form.curso} onChange={alterar}>
              <option value="">Selecione...</option>
              {cursos.map((c) => <option key={c.id} value={c.nome}>{c.nome}</option>)}
            </select>
            {erros.curso && <span className="erro">{erros.curso}</span>}
          </label>

          <label>Turno
            <select name="turno" value={form.turno} onChange={alterar}>
              <option value="">Selecione...</option>
              {turnos.map((t) => (
                <option key={t.nome} value={t.nome}>{t.nome} · {t.horario}</option>
              ))}
            </select>
            {erros.turno && <span className="erro">{erros.turno}</span>}
          </label>

          <label>Mensagem (opcional)
            <textarea
              name="mensagem"
              rows="4"
              value={form.mensagem}
              onChange={alterar}
              placeholder="Dúvidas sobre mensalidade, bolsas ou documentos..."
            />
          </label>

          <button className="btn btn-escuro" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      )}
    </section>
  )
}
