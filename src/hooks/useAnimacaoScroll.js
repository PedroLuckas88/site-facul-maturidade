import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Elementos que ganham animação de entrada. "escalonar" aplica um atraso
// progressivo nos filhos, o que fica bom em grades e listas.
const grupos = [
  { seletor: '.hero-conteudo' },
  { seletor: '.secao > .eyebrow' },
  { seletor: '.secao > h2' },
  { seletor: '.secao > p' },
  { seletor: '.secao-topo' },
  { seletor: '.texto' },
  { seletor: '.filtros' },
  { seletor: '.sucesso' },
  { seletor: '.grid-cursos', escalonar: true },
  { seletor: '.sobre', escalonar: true },
  { seletor: '.faixa-preco', escalonar: true },
  { seletor: '.espacos', escalonar: true },
  { seletor: '.form', escalonar: true },
  // Página de detalhe do curso
  { seletor: '.curso-hero-conteudo' },
  { seletor: '.subtitulo' },
  { seletor: '.lista-check', escalonar: true },
  { seletor: '.tags', escalonar: true },
  { seletor: '.grade', escalonar: true },
  { seletor: '.turnos', escalonar: true },
  { seletor: '.cta-botoes' },
]

const ATRASO_MAXIMO = 6
const ATRASO_POR_ITEM = 90

// Marca os elementos para animar e revela cada um quando ele entra na tela.
export default function useAnimacaoScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    const semSuporte = !('IntersectionObserver' in window)
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semSuporte || menosMovimento) return

    const alvos = new Set()
    grupos.forEach(({ seletor, escalonar }) => {
      document.querySelectorAll(seletor).forEach((encontrado) => {
        const itens = escalonar ? Array.from(encontrado.children) : [encontrado]
        itens.forEach((el, i) => {
          if (escalonar) el.style.transitionDelay = `${Math.min(i, ATRASO_MAXIMO) * ATRASO_POR_ITEM}ms`
          el.dataset.animacao = 'pendente'
          alvos.add(el)
        })
      })
    })
    if (alvos.size === 0) return

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return
          entrada.target.dataset.animacao = 'visivel'
          observador.unobserve(entrada.target)
        })
      },
      // O -60px embaixo faz o elemento aparecer um pouco antes de encostar na borda
      { rootMargin: '0px 0px -60px 0px' },
    )

    alvos.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [pathname])
}
