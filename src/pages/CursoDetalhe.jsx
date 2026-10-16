import { Link, useParams } from 'react-router-dom'
import { cursos, turnos, formatarPreco, formatarCargaHoraria } from '../data/cursos'
import '../styles/paginas.css'
import '../styles/curso.css'

export default function CursoDetalhe() {
  const { id } = useParams()
  const curso = cursos.find((c) => String(c.id) === id)

  if (!curso) {
    return (
      <section className="secao secao-clara pagina">
        <span className="eyebrow">CURSO NÃO ENCONTRADO</span>
        <h2>Não encontramos esse curso.</h2>
        <p className="texto">O endereço acessado não corresponde a nenhum curso da Avante.</p>
        <Link to="/cursos" className="btn btn-escuro">Ver todos os cursos</Link>
      </section>
    )
  }

  return (
    <>
      {/* Banner com a mesma imagem que aparece no card do curso */}
      <header className="curso-hero" style={{ backgroundImage: `url(${curso.imagem})` }}>
        <div className="curso-hero-conteudo">
          <Link to="/cursos" className="voltar">← Todos os cursos</Link>
          <span className="eyebrow">{curso.tipo} · {curso.area}</span>
          <h1>{curso.nome}</h1>
          <ul className="curso-hero-meta">
            <li><strong>{curso.semestres} semestres</strong></li>
            <li><strong>{formatarCargaHoraria(curso.cargaHoraria)}</strong> de carga horária</li>
            <li>A partir de <strong>{formatarPreco(curso.preco)}</strong>/mês</li>
          </ul>
        </div>
      </header>

      <section className="secao secao-clara">
        <span className="eyebrow">SOBRE O CURSO</span>
        <h2>Para que serve {curso.nome}?</h2>
        <p className="texto">{curso.paraQueServe}</p>

        <h3 className="subtitulo">O que você vai aprender</h3>
        <ul className="lista-check">
          {curso.competencias.map((competencia) => <li key={competencia}>{competencia}</li>)}
        </ul>

        <h3 className="subtitulo">Áreas de atuação</h3>
        <ul className="tags">
          {curso.atuacao.map((area) => <li key={area}>{area}</li>)}
        </ul>
      </section>

      <section className="secao secao-escura">
        <span className="eyebrow">GRADE CURRICULAR</span>
        <h2>Cadeiras semestre a semestre</h2>
        <p className="texto">
          Do primeiro ao último semestre, veja o que você estuda no curso de {curso.nome}.
          A grade pode sofrer pequenos ajustes conforme as diretrizes curriculares.
        </p>
        <ol className="grade">
          {curso.grade.map(({ semestre, cadeiras }) => (
            <li key={semestre} className="grade-semestre">
              <h3>{semestre}º semestre</h3>
              <ul>
                {cadeiras.map((cadeira) => <li key={cadeira}>{cadeira}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="secao secao-clara">
        <span className="eyebrow">TURNOS E HORÁRIOS</span>
        <h2>Estude no horário que funciona para você</h2>
        <p className="texto">
          O curso de {curso.nome} é presencial e tem turmas nos três turnos, com aulas de
          segunda a sexta-feira.
        </p>
        <ul className="turnos">
          {turnos.map((turno) => (
            <li key={turno.nome} className="turno">
              <strong>{turno.nome}</strong>
              <span className="turno-horario">{turno.horario}</span>
              <span className="turno-dias">{turno.dias}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="secao secao-escura cta-curso">
        <h2>Pronto para começar?</h2>
        <p>Garanta sua vaga no curso de {curso.nome}.</p>
        <div className="cta-botoes">
          <Link to="/contato" className="btn btn-claro">Quero me matricular →</Link>
          <Link to="/cursos" className="btn btn-borda">Ver outros cursos</Link>
        </div>
      </section>
    </>
  )
}
