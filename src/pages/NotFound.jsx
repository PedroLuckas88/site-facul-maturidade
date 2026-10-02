import { Link } from 'react-router-dom'
import '../styles/paginas.css'

export default function NotFound() {
  return (
    <section className="secao secao-clara pagina">
      <h2>Página não encontrada</h2>
      <Link to="/" className="btn btn-escuro">Voltar ao início</Link>
    </section>
  )
}
