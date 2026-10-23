import { useEffect, useMemo, useState } from 'react'
import { supabase, supabaseConfigurado } from '../lib/supabase'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [sessao, setSessao] = useState(null)
  const [carregando, setCarregando] = useState(supabaseConfigurado)

  useEffect(() => {
    if (!supabase) return undefined

    let ativo = true
    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return
      setSessao(data.session ?? null)
      setCarregando(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_evento, session) => {
      setSessao(session ?? null)
    })

    return () => {
      ativo = false
      data.subscription.unsubscribe()
    }
  }, [])

  const valor = useMemo(
    () => ({
      sessao,
      usuario: sessao?.user ?? null,
      carregando,
      supabaseConfigurado,
      entrar: (email, senha) => supabase.auth.signInWithPassword({ email, password: senha }),
      sair: () => supabase.auth.signOut(),
    }),
    [sessao, carregando],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
