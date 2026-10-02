import { useState } from 'react'
import { cursos } from '../data/cursos'
import '../styles/paginas.css'

const inicial = { nome: '', email: '', curso: '' }

export default function Contato() {
  const [form, setForm] = useState(inicial)
  const [erros, setErros] = useState({})
  const [enviado, setEnviado] = useState(false)

  const alterar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Valida os campos e devolve um objeto com as mensagens de erro
  const validar = () => {
    const e = {}
    if (form.nome.trim().length < 3) e.nome = 'Digite seu nome completo.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Digite um e-mail válido.'
    if (!form.curso) e.curso = 'Escolha um curso.'
    return e
  }

  const enviar = (ev) => {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    if (Object.keys(e).length === 0) {
      setEnviado(true) // no futuro: enviar para uma API
      setForm(inicial)
    }
  }

  return (
    <section className="secao secao-clara pagina">
      <span className="eyebrow">CONTATO</span>
      <h2>Quero me matricular</h2>

      {enviado ? (
        <p className="sucesso">Recebemos seus dados! Em breve entraremos em contato.</p>
      ) : (
        <form className="form" onSubmit={enviar} noValidate>
          <label>Nome
            <input name="nome" value={form.nome} onChange={alterar} />
            {erros.nome && <span className="erro">{erros.nome}</span>}
          </label>
          <label>E-mail
            <input name="email" type="email" value={form.email} onChange={alterar} />
            {erros.email && <span className="erro">{erros.email}</span>}
          </label>
          <label>Curso de interesse
            <select name="curso" value={form.curso} onChange={alterar}>
              <option value="">Selecione...</option>
              {cursos.map((c) => <option key={c.id}>{c.nome}</option>)}
            </select>
            {erros.curso && <span className="erro">{erros.curso}</span>}
          </label>
          <button className="btn btn-escuro">Enviar</button>
        </form>
      )}
    </section>
  )
}
