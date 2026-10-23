import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import '../../styles/paginas.css'
import '../../styles/admin.css'

export default function AdminLogin() {
  const { usuario, carregando, supabaseConfigurado, entrar } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (carregando) return <p className="admin-status">Carregando...</p>
  if (usuario) return <Navigate to="/secretaria" replace />

  const enviar = async (ev) => {
    ev.preventDefault()
    setErro('')
    if (!supabaseConfigurado) {
      setErro('O Supabase ainda não está configurado.')
      return
    }
    setEnviando(true)
    const { error } = await entrar(email.trim(), senha)
    setEnviando(false)
    if (error) setErro('E-mail ou senha inválidos.')
  }

  return (
    <section className="admin-login">
      <span className="eyebrow">ÁREA INTERNA</span>
      <h1>Painel da secretaria</h1>
      <p>Entre com o usuário admin do Supabase para ver os interessados em matrícula.</p>

      <form className="form" onSubmit={enviar}>
        {erro && <p className="erro">{erro}</p>}
        <label>E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        </label>
        <label>Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" required />
        </label>
        <button className="btn btn-escuro" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </section>
  )
}
