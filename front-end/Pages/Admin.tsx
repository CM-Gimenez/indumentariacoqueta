import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import baseClasses from './layout.module.scss'

const Admin: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const theme = estilosmodulescss
  const [lang, setlang] = React.useState<any>('en')
  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)

  if (!authHeaders()) {
    props.history.push('/Login')
  }

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  // Theme selection

  return (
    <React.Fragment>
      <div className={classes.mainPanel}>
        {currentUser && (
          <React.Fragment>
            <AppBar elevation={3} color="transparent" position="absolute" title="">
              <Toolbar>
                <IconButton
                  onClickCapture={(event) => {
                    setprofileMenuAnchor(event.currentTarget)
                  }}
                  className={theme.profilePicture}
                >
                  <picture>
                    <img src={`/img/${currentUser.ProfilePic}`} alt={`/img/${currentUser.ProfilePic}`} />
                  </picture>
                </IconButton>

                <Menu
                  anchorEl={profileMenuAnchor}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(profileMenuAnchor)}
                  onClose={(params) => {
                    setprofileMenuAnchor(null)
                  }}
                >
                  <div title="div" className={theme.menuProfileDetails}>
                    {currentUser.FirstName} {currentUser.LastName}
                  </div>

                  <MenuItem>Profile</MenuItem>
                  <MenuItem
                    onClick={(params) => {
                      AuthService.logout()
                      props.history.push('/')
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
          </React.Fragment>
        )}

        <Sidebar color="Black" open={true}>
          <NavLink exact to="/" key="cmx05Q16">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Home</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Users" key="R09se9vW">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Users</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink exact to="/Producto" key="AHeTTdfQ">
            <ListItem button className={classes.itemLink}>
              <ListItemText>Producto</ListItemText>
            </ListItem>
          </NavLink>
        </Sidebar>
      </div>
    </React.Fragment>
  )
}

export default Admin
