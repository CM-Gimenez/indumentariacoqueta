import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import Carousel from 'react-material-ui-carousel'
import { NavLink } from 'react-router-dom'
import baseClasses from './layout.module.scss'

const Nosotros: FunctionComponent = (props: any) => {
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
      <div className={classes.mainPanel}>
        <AppBar elevation={0} color="default" position="static" title="Coqueta">
          <Toolbar className={theme.navb}>
            <Grid container alignItems="center" justifyContent="flex-start">
              <picture>
                <img className={theme.icono} src="/img/iconoC.jpg" alt="icono" width="60" height="60" />
              </picture>
              Coqueta Indumentaria
            </Grid>

            <Grid container alignItems="center" justifyContent="space-between" className={theme.inicio}>
              <NavLink exact to="/" key="V0x2WkU3">
                <ListItem button className={classes.itemLink}>
                  <ListItemText>Inicio</ListItemText>
                </ListItem>
              </NavLink>

              <NavLink exact to="/nosotros" key="956nttCf">
                <ListItem button className={classes.itemLink}>
                  <ListItemText>Nosotros</ListItemText>
                </ListItem>
              </NavLink>

              <NavLink exact to="/productos" key="Rm83eAkn">
                <ListItem button className={classes.itemLink}>
                  <ListItemText>Coleccion</ListItemText>
                </ListItem>
              </NavLink>

              <NavLink exact to="/contactos" key="FxRu37Mm">
                <ListItem button className={classes.itemLink}>
                  <ListItemText>Contactos</ListItemText>
                </ListItem>
              </NavLink>

              <NavLink exact to="/admin" key="xgMZf52h">
                <ListItem button className={classes.itemLink}>
                  <ListItemText>Administracion</ListItemText>
                </ListItem>
              </NavLink>
            </Grid>
          </Toolbar>
        </AppBar>

        <div title="div">
          <div title="div">
            <Carousel>
              <picture>
                <img src="/img/1.jpg" alt="image1" />
              </picture>

              <picture>
                <img src="/img/2.jpg" alt="image2" />
              </picture>

              <picture>
                <img src="/img/3.jpg" alt="image3" />
              </picture>

              <picture>
                <img src="/img/4.jpg" alt="image4" />
              </picture>
            </Carousel>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Nosotros
