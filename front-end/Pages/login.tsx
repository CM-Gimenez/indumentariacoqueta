import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { useGoogleLogin } from 'react-google-login'
import AuthService from '../services/auth.service'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const LoginPage: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = estilosmodulescss
  const [lang, setlang] = React.useState<any>('en')
  const [loginError, setloginError] = React.useState<any>(null)
  const [loginData, setloginData] = React.useState<any>({
    Email: '',
    Password: '',
    RememberMe: false,
  })

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  // Theme selection

  const onGoogleSuccess = (res) => {
    console.log('Login Success: Current User: ', res.profileObj)
  }

  const onGoogleFailure = (res) => {
    console.log('Login Failed: res: ', res)
    if (res.error === 'popup_closed_by_user') {
      setloginError('You must complete the login process in order to login.')
    }
  }

  const { signIn: googleSignIn } = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    onFailure: onGoogleFailure,
    clientId: '185605994716-97itv5an2ligdaq8b4r3l4r8h95rlip6.apps.googleusercontent.com',
    isSignedIn: false,
    accessType: 'offline',
  })

  const handleLogin = () => {
    AuthService.login(loginData.Email, loginData.Password).then(
      (res) => {
        console.log(res)
        props.history.push('/admin')
      },
      (error) => {
        setloginError(error.response.data.message)
      }
    )
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={clsx(theme.pages, theme.inicio)}>
          <Container className={theme.loginPage} maxWidth={false}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item md={8}>
                <div title="Login Box" className={theme.loginBox}>
                  <div title="Heading">
                    <Typography variant="h3">Coqueta Indumentaria</Typography>
                  </div>

                  {loginError && (
                    <React.Fragment>
                      <Alert variant="standard" severity="error">
                        {loginError}
                      </Alert>
                    </React.Fragment>
                  )}

                  <TextField
                    variant="outlined"
                    placeholder="Email Address"
                    margin="normal"
                    label="Email"
                    type="text"
                    fullWidth
                    value={loginData.Email}
                    onChange={(e) => {
                      setloginData({ ...loginData, Email: e.target.value })
                    }}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    type="password"
                    fullWidth
                    value={loginData.Password}
                    onChange={(e) => {
                      setloginData({ ...loginData, Password: e.target.value })
                    }}
                  />

                  <Button variant="contained" color="primary" onClickCapture={handleLogin} fullWidth>
                    Login
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default LoginPage
