import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Cursos from './pages/Cursos'
import Instituicao from './pages/Instituicao'
import Estrutura from './pages/Estrutura'
import Contato from './pages/Contato'
import NotFound from './pages/NotFound'

// Todas as rotas do site ficam aqui
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/instituicao" element={<Instituicao />} />
          <Route path="/estrutura" element={<Estrutura />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
