import AppBar from '@mui/material/AppBar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadProducto, searchProducto } from '../store/actions/productoActions'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const Productos: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = estilosmodulescss
  const [lang, setlang] = React.useState<any>('en')
  const productos = useSelector((state: IState) => state.producto).producto
  const productoData = useSelector((state: IState) => state.producto)
  const dispatch = useDispatch()
  const [LoadfromDatabaseloadoptions, setLoadfromDatabaseloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performLoadfromDatabaseload = (options) => {
    dispatch(options.searchString ? searchProducto(options) : loadProducto(options))
  }
  React.useEffect(() => {
    performLoadfromDatabaseload({
      ...LoadfromDatabaseloadoptions,
    })
  }, [LoadfromDatabaseloadoptions])

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.pages}>
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

        <Container>
          <Grid item>
            {productos.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Card></Card>

                  <CardHeader title="">
                    <CardContent>
                      <Typography variant=""></Typography>
                    </CardContent>
                  </CardHeader>
                </React.Fragment>
              )
            })}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Productos
