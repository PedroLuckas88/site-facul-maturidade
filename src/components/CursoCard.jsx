import { Link } from 'react-router-dom'
import { formatarPreco } from '../data/cursos'

// O card inteiro é um link para a página de detalhe do curso.
export default function CursoCard({ curso }) {
  return (
    <Link to={`/cursos/${curso.id}`} className="curso-card">
      <div
        className="curso-img"
        style={{ backgroundImage: `url(${curso.imagem})` }}
        aria-hidden="true"
      />
      <div className="curso-info">
        <h3>{curso.nome}</h3>
        <p className="curso-meta">{curso.tipo} · {curso.semestres} semestres</p>
        <div className="curso-rodape">
          <p>A partir de <strong>{formatarPreco(curso.preco)}/mês</strong></p>
          <span className="seta" aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  )
}
