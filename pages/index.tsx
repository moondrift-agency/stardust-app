import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

// Components
import Account from '../components/Account'
import LoginDialog from '../components/Login/LoginDialog'

// MUI
import Container from '@mui/material/Container'

const Home: NextPage = () => {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Container>{!session ? <LoginDialog /> : 'Tu es connecté !'}</Container>
  )
}

export default Home
