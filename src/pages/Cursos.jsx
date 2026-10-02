import { useState } from 'react'
import CursoCard from '../components/CursoCard'
import { cursos } from '../data/cursos'
import '../styles/home.css'
import '../styles/paginas.css'

const tipos = ['Todos', 'Graduação', 'Tecnólogo']

export default function Cursos() {
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState('Todos')

  // Filtra pela busca (sem diferenciar maiúsculas) e pelo tipo
  const filtrados = cursos.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) &&
      (tipo === 'Todos' || c.tipo === tipo),
  )

  return (
    <section className="secao secao-clara pagina">
      <span className="eyebrow">NOSSOS CURSOS</span>
      <h2>Encontre o curso ideal para você</h2>

      <div className="filtros">
        <input
          type="search"
          placeholder="Buscar curso..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {tipos.map((t) => (
          <button key={t} className={`chip ${tipo === t ? 'ativo' : ''}`} onClick={() => setTipo(t)}>
            {t}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <p>Nenhum curso encontrado.</p>
      ) : (
        <div className="grid-cursos">
          {filtrados.map((c) => <CursoCard key={c.id} curso={c} />)}
        </div>
      )}
    </section>
  )
}
