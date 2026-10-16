import { Link } from 'react-router-dom'
import { formatarPreco } from '../data/cursos'

export default function CursoCard({ curso }) {
  return (
    <article className="curso-card">
      <div
        className="curso-img"
        style={{ backgroundImage: `url(${curso.imagem})` }}
        role="img"
        aria-label={`Imagem do curso de ${curso.nome}`}
      />
      <div className="curso-info">
        <h3>{curso.nome}</h3>
        <p className="curso-meta">{curso.tipo} · {curso.semestres} semestres</p>
        <div className="curso-rodape">
          <p>A partir de <strong>{formatarPreco(curso.preco)}/mês</strong></p>
          <Link to="/contato" className="seta" aria-label={`Saiba mais sobre ${curso.nome}`}>→</Link>
        </div>
      </div>
    </article>
  )
}
