import '../styles/paginas.css'

const espacos = [
  ['📚', 'Biblioteca'],
  ['🧪', 'Laboratórios'],
  ['🏫', 'Salas de aula'],
  ['☕', 'Área de convivência'],
  ['📶', 'Espaços acadêmicos'],
]

export default function Estrutura() {
  return (
    <section className="secao secao-clara pagina">
      <span className="eyebrow">ESTRUTURA</span>
      <h2>Viva a experiência Avante</h2>
      <p className="texto">Uma estrutura completa para você aprender, se desenvolver e viver grandes momentos.</p>
      <ul className="espacos">
        {espacos.map(([icone, nome]) => (
          <li key={nome}><span>{icone}</span>{nome}</li>
        ))}
      </ul>
    </section>
  )
}
