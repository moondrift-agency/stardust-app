import { useState } from 'react'
import { LoginDialog } from './LoginDialog.styles'
import { supabase } from '../../lib/supabaseClient'

//MUI
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

// MUI FORM
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'

const Login = () => {
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'discord',
      })
      if (error) throw error
      alert(session)
    } catch (error) {
      //alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginDialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Connexion'}</DialogTitle>
      <DialogContent>
        {/* <Stack>
          <InputLabel className="connexion-label" htmlFor="email">
            Email
          </InputLabel>
        </Stack> */}
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault()
            handleLogin()
          }}
        >
          Login with discord
        </Button>
      </DialogContent>
      <DialogActions></DialogActions>
    </LoginDialog>
  )
}

export default Login
