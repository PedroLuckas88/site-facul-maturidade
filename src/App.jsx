import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import useAnimacaoScroll from './hooks/useAnimacaoScroll'
import Home from './pages/Home'
import Cursos from './pages/Cursos'
import CursoDetalhe from './pages/CursoDetalhe'
import Instituicao from './pages/Instituicao'
import Estrutura from './pages/Estrutura'
import Contato from './pages/Contato'
import Conversa from './pages/Conversa'
import AdminLogin from './pages/admin/AdminLogin'
import AdminPainel from './pages/admin/AdminPainel'
import NotFound from './pages/NotFound'
import './styles/animacoes.css'

export default function App() {
  const { pathname } = useLocation()
  const areaAdmin = pathname.startsWith('/secretaria') || pathname.startsWith('/admin')
  useAnimacaoScroll()

  return (
    <>
      <ScrollToTop />
      {!areaAdmin && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/:id" element={<CursoDetalhe />} />
          <Route path="/instituicao" element={<Instituicao />} />
          <Route path="/estrutura" element={<Estrutura />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/conversa/:token" element={<Conversa />} />
          <Route path="/secretaria/login" element={<AdminLogin />} />
          <Route path="/secretaria" element={<AdminPainel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!areaAdmin && <Footer />}
    </>
  )
}
