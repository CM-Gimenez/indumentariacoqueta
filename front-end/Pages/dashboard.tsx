import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import AppBar from '@mui/material/AppBar'
import pink from '@mui/material/colors/pink'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import Carousel from 'react-material-ui-carousel'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: pink,
  },
})

const Dashboard: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = estilosmodulescss
  const [lang, setlang] = React.useState<any>('en')

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  // Theme selection

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.inicio}>
          <AppBar elevation={0} color="default" position="static" title="Coqueta">
            <Toolbar className={theme.navb}>
              <div title="div" className={theme.navIcono}>
                <picture>
                  <img className={theme.icono} src="/img/iconoC.jpg" alt="/img/iconoC.jpg" />
                </picture>

                <Typography variant="subtitle1">Coqueta Indumentaria</Typography>
              </div>
            </Toolbar>
          </AppBar>

          <div title="DivPrincipal" className={theme.divPrincipal}>
            <Typography variant="h1">Coqueta</Typography>

            <Typography variant="h5">Indumentaria Femenina</Typography>

            <picture>
              <img src="/img/iconoC.jpg" alt="inicio" width="400" height="400" />
            </picture>
          </div>

          <div title="DivNosotros" className={theme.divNosotros}>
            <Container className={theme.containerCarousel} maxWidth="lg">
              <Carousel className={theme.centrarCarousel}>
                <picture>
                  <img src="/img/4.jpg" alt="image4" height="720" />
                </picture>

                <picture>
                  <img src="/img/3.jpg" alt="image3" height="720" />
                </picture>

                <picture>
                  <img src="/img/2.jpg" alt="image2" height="720" />
                </picture>

                <picture>
                  <img src="/img/1.jpg" alt="image1" height="720" />
                </picture>
              </Carousel>
            </Container>
          </div>

          <div title="Foot" className={theme.divFoot}>
            <IconButton>
              <FacebookIcon />
            </IconButton>

            <IconButton>
              <TwitterIcon />
            </IconButton>

            <IconButton>
              <GoogleIcon />
            </IconButton>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Dashboard
