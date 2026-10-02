import { Link } from 'react-router-dom'
import CursoCard from '../components/CursoCard'
import Contador from '../components/Contador'
import { cursos } from '../data/cursos'
import '../styles/home.css'

const numeros = [
  { valor: 20, label: 'Cursos' },
  { valor: 5000, label: 'Alunos' },
  { valor: 15, label: 'Anos de experiência' },
  { valor: 300, label: 'Professores' },
]

export default function Home() {
  const menorPreco = Math.min(...cursos.map((c) => c.preco))

  return (
    <>
      <section className="hero">
        <div className="hero-conteudo">
          <span className="eyebrow">UNIVERSIDADE AVANTE</span>
          <h1>Seu futuro<br />começa aqui.</h1>
          <p>Conheça a Universidade Avante e encontre o curso ideal para transformar seus próximos passos.</p>
          <div className="hero-botoes">
            <Link to="/cursos" className="btn btn-claro">Conheça nossos cursos →</Link>
            <Link to="/instituicao" className="btn btn-borda">Conheça a Avante</Link>
          </div>
        </div>
      </section>

      <section className="secao secao-clara">
        <span className="eyebrow">CONHEÇA NOSSOS CURSOS</span>
        <div className="secao-topo">
          <h2>Encontre o curso ideal<br />para você</h2>
          <Link to="/cursos" className="link-ver">Ver todos os cursos →</Link>
        </div>
        <div className="grid-cursos">
          {cursos.slice(0, 3).map((c) => <CursoCard key={c.id} curso={c} />)}
        </div>
      </section>

      <section className="secao secao-escura sobre">
        <div>
          <span className="eyebrow">SOBRE A AVANTE</span>
          <h2>Mais que uma faculdade,<br />uma comunidade.</h2>
          <p>A Universidade Avante é uma instituição comprometida com a formação de profissionais preparados para os desafios do mercado e para construir um futuro melhor.</p>
          <div className="numeros">
            {numeros.map((n) => (
              <div key={n.label}>
                <strong><Contador valor={n.valor} /></strong>
                <span>{n.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sobre-img" />
      </section>

      <section className="faixa-preco">
        <div>
          <span className="eyebrow">INVISTA NO SEU FUTURO</span>
          <p>Mensalidade a partir de</p>
          <strong className="preco-grande">R$ {menorPreco}<small>,00</small></strong>
        </div>
        <div>
          <h4>Formas de pagamento</h4>
          <p>Cartão de crédito · Pix · Boleto</p>
          <Link to="/contato" className="btn btn-escuro">Quero me matricular →</Link>
        </div>
      </section>

      <section className="secao secao-clara cta">
        <h2>Dê o próximo passo.</h2>
        <p>Escolha seu curso, conheça a Universidade Avante e comece a construir seu futuro.</p>
        <Link to="/cursos" className="btn btn-escuro">Conheça nossos cursos →</Link>
      </section>
    </>
  )
}
