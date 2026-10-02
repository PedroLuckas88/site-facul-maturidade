import { useEffect, useState } from 'react'

// Anima um número de 0 até o valor final
export default function Contador({ valor, prefixo = '+', duracao = 1200 }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    const inicio = performance.now()
    let id
    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracao, 1)
      setN(Math.floor(progresso * valor))
      if (progresso < 1) id = requestAnimationFrame(passo)
    }
    id = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(id)
  }, [valor, duracao])

  return <>{prefixo}{n.toLocaleString('pt-BR')}</>
}
