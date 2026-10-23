import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import '../styles/header.css'

const links = [
  { to: '/', label: 'Início' },
  { to: '/cursos', label: 'Cursos' },
  { to: '/instituicao', label: 'Instituição' },
  { to: '/estrutura', label: 'Estrutura' },
  { to: '/contato', label: 'Contato' },
]

export default function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={() => setAberto(false)}>
        <span className="logo-a">A</span>
        <span>UNIVERSIDADE<strong>AVANTE</strong></span>
      </Link>

      <button className="menu-btn" onClick={() => setAberto(!aberto)} aria-label="Abrir menu">
        {aberto ? '✕' : '☰'}
      </button>

      <nav className={`nav ${aberto ? 'aberto' : ''}`}>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setAberto(false)}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
