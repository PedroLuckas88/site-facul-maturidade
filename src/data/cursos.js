// Dados dos cursos em um só lugar. Para adicionar um curso, é só incluir um item aqui.
import administracao from '../assets/administracao.jpg'
import ads from '../assets/ads.jpeg'
import cienciasContabeis from '../assets/ciencias-contabeis.jpg'
import direito from '../assets/direito.jpg'
import gestaoRh from '../assets/gestao-rh.jpeg'
import marketing from '../assets/marketing.jpg'

export const cursos = [
  { id: 1, nome: 'Administração', tipo: 'Graduação', semestres: 8, preco: 899, imagem: administracao },
  { id: 2, nome: 'Análise e Desenvolvimento de Sistemas', tipo: 'Graduação', semestres: 5, preco: 1099, imagem: ads },
  { id: 3, nome: 'Direito', tipo: 'Graduação', semestres: 10, preco: 1299, imagem: direito },
  { id: 4, nome: 'Ciências Contábeis', tipo: 'Graduação', semestres: 8, preco: 949, imagem: cienciasContabeis },
  { id: 5, nome: 'Marketing Digital', tipo: 'Tecnólogo', semestres: 4, preco: 799, imagem: marketing },
  { id: 6, nome: 'Gestão de Recursos Humanos', tipo: 'Tecnólogo', semestres: 4, preco: 779, imagem: gestaoRh },
]

export const formatarPreco = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
