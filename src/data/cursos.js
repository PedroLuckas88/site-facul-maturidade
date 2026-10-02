// Dados dos cursos em um só lugar. Para adicionar um curso, é só incluir um item aqui.
export const cursos = [
  { id: 1, nome: 'Administração', tipo: 'Graduação', semestres: 8, preco: 899 },
  { id: 2, nome: 'Análise e Desenvolvimento de Sistemas', tipo: 'Graduação', semestres: 5, preco: 1099 },
  { id: 3, nome: 'Direito', tipo: 'Graduação', semestres: 10, preco: 1299 },
  { id: 4, nome: 'Ciências Contábeis', tipo: 'Graduação', semestres: 8, preco: 949 },
  { id: 5, nome: 'Marketing Digital', tipo: 'Tecnólogo', semestres: 4, preco: 799 },
  { id: 6, nome: 'Gestão de Recursos Humanos', tipo: 'Tecnólogo', semestres: 4, preco: 779 },
]

export const formatarPreco = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
