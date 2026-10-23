import biblioteca from '../assets/biblioteca.jpg'
import laboratorios from '../assets/laboratorios.jpg'
import salasAula from '../assets/salas-aula.jpg'
import convivencia from '../assets/convivencia.jpg'
import campus from '../assets/campus.png'
import '../styles/paginas.css'

const espacos = [
  {
    nome: 'Biblioteca',
    descricao: 'Acervo físico e digital, salas de estudo e ambientes silenciosos para pesquisa.',
    imagem: biblioteca,
  },
  {
    nome: 'Laboratórios',
    descricao: 'Espaços equipados para práticas de saúde, tecnologia e ciências aplicadas.',
    imagem: laboratorios,
  },
  {
    nome: 'Salas de aula',
    descricao: 'Ambientes climatizados, com projeção e estrutura pensada para o aprendizado.',
    imagem: salasAula,
  },
  {
    nome: 'Área de convivência',
    descricao: 'Pontos de encontro para descanso, conversa e integração entre alunos.',
    imagem: convivencia,
  },
  {
    nome: 'Espaços acadêmicos',
    descricao: 'Campus completo para viver a rotina universitária além da sala de aula.',
    imagem: campus,
  },
]

export default function Estrutura() {
  return (
    <section className="secao secao-clara pagina">
      <span className="eyebrow">ESTRUTURA</span>
      <h2>Viva a experiência Avante</h2>
      <p className="texto">Uma estrutura completa para você aprender, se desenvolver e viver grandes momentos.</p>
      <ul className="espacos">
        {espacos.map((espaco) => (
          <li key={espaco.nome} className="espaco-card">
            <img
              className="espaco-img"
              src={espaco.imagem}
              alt={`Foto de ${espaco.nome} da Universidade Avante`}
              loading="lazy"
              decoding="async"
            />
            <div className="espaco-info">
              <strong>{espaco.nome}</strong>
              <p>{espaco.descricao}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
