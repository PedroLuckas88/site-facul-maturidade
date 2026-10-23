import { Link } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="logo"><span className="logo-a">A</span><span>UNIVERSIDADE<strong>AVANTE</strong></span></div>
        <nav>
          <Link to="/cursos">Cursos</Link>
          <Link to="/instituicao">Instituição</Link>
          <Link to="/estrutura">Estrutura</Link>
          <Link to="/contato">Contato</Link>
        </nav>
        <address>
          <p>Av. das Universidades, 1000 · Recife - PE</p>
          <p>(81) 3333-4444</p>
          <p>contato@avante.edu.br</p>
        </address>
      </div>
      <small>
        © {new Date().getFullYear()} Universidade Avante. Todos os direitos reservados.
        {' '}<Link to="/secretaria" className="footer-interno">Área interna</Link>
      </small>
    </footer>
  )
}
