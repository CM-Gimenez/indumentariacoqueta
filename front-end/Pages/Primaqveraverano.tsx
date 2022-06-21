import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AppBar from '@mui/material/AppBar'
import green from '@mui/material/colors/green'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import estilosmodulescss from 'dist/css/estilos.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddDialog from '../components/Dialog/Dialog'
import Sidebar from '../components/Sidebar/Sidebar'
import Field from '../components/Table/Field'
import Table from '../components/Table/Table'
import authHeaders from '../services/auth-header'
import AuthService from '../services/auth.service'
import {
  addPrimaqveraverano,
  editPrimaqveraverano,
  loadPrimaqveraverano,
  removeSingleuntitled,
  searchPrimaqveraverano,
} from '../store/actions/primaqveraveranoActions'
import { IPrimaqveraveranoItem } from '../store/models'
import { IState } from '../store/reducers/index'
import baseClasses from './layout.module.scss'

const aptugotheme = createTheme({
  palette: {
    primary: green,
  },
})

const Primaqveraverano: FunctionComponent = (props: any) => {
  const classes = baseClasses
  const initialDataPrimaqveraverano = {
    Name: '',
    Marca: '',
    Desription: '',
    Price: '',
  }
  const [Primaqveraveranodata, setPrimaqveraveranoData] = React.useState<any>(initialDataPrimaqveraverano)
  const handlePrimaqveraveranoChange = (name: string) => (event: any) => {
    const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
    setPrimaqveraveranoData({
      ...Primaqveraveranodata,
      [name]: value,
    })
  }
  const primaqveraveranoData = useSelector((state: IState) => state.primaqveraverano)
  const [lang, setlang] = React.useState<any>('en')
  const theme = estilosmodulescss
  const [currentUser, setcurrentUser] = React.useState<any>(AuthService.getCurrentUser())
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForPrimaqveraverano = (event) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({ ...tableloadoptions, searchString: event.target.value })
    }, 500)
  }
  const [searchFieldloadoptions, setsearchFieldloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performsearchFieldload = (options) => {
    dispatch(options.searchString ? searchPrimaqveraverano(options) : loadPrimaqveraverano(options))
  }
  React.useEffect(() => {
    performsearchFieldload({
      ...searchFieldloadoptions,
    })
  }, [searchFieldloadoptions])
  const [dialogPrimaqveraveranoAction, setdialogPrimaqveraveranoAction] = React.useState<'add' | 'edit' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchPrimaqveraverano(options) : loadPrimaqveraverano(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  if (!authHeaders()) {
    props.history.push('/Login')
  }

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <ThemeProvider theme={aptugotheme}>
        <div className={theme.pages}>
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

            <NavLink exact to="/Primaqveraverano" key="MTG06Ggd">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Primaqveraverano</ListItemText>
              </ListItem>
            </NavLink>

            <NavLink exact to="/Otonioinvierno" key="AHeTTdfQ">
              <ListItem button className={classes.itemLink}>
                <ListItemText>Otonioinvierno</ListItemText>
              </ListItem>
            </NavLink>
          </Sidebar>
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

          <div title="div" className={theme.mainarea}>
            <Container maxWidth="lg">
              <div title="Head" className={theme.tableHeading}>
                <Typography variant="h4">Single Untitled list</Typography>
              </div>

              <Paper>
                <div title="Table Area" className={classes.tableResponsive}>
                  <div title="Table Toolbar" className={theme.tabletoolbar}>
                    <TextField
                      variant="outlined"
                      placeholder="Search SingleUntitled..."
                      margin="normal"
                      className={theme.extensibleInput}
                      type="text"
                      fullWidth
                      onChange={searchForPrimaqveraverano}
                    />

                    <LocalAddDialog
                      isOpen={dialogPrimaqveraveranoAction !== ''}
                      onOpen={() => setdialogPrimaqveraveranoAction('add')}
                      onSave={() => setdialogPrimaqveraveranoAction('')}
                      onClose={() => setdialogPrimaqveraveranoAction('')}
                      action={dialogPrimaqveraveranoAction}
                      addOptions={{ title: 'Add Single Untitled ', text: 'Enter Single Untitled  data', button: 'Add' }}
                      editOptions={{ title: 'Edit Single Untitled ', text: 'Update Single Untitled  data', button: 'Edit' }}
                      removeOptions={{ title: '', text: '', button: '' }}
                      saveDataHandler={(data: IPrimaqveraveranoItem) => {
                        if (dialogPrimaqveraveranoAction === 'delete') {
                          dispatch(removeSingleuntitled(data))
                        } else {
                          dialogPrimaqveraveranoAction === 'add' ? dispatch(addPrimaqveraverano(data)) : dispatch(editPrimaqveraverano(data))
                        }
                      }}
                      color="primary"
                      data={Primaqveraveranodata}
                      initialData={initialDataPrimaqveraverano}
                      setData={setPrimaqveraveranoData}
                      allowMultipleSubmit={dialogPrimaqveraveranoAction === 'add'}
                    >
                      <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        className={'field_Name'}
                        variant="standard"
                        value={Primaqveraveranodata.Name || ''}
                        onChange={handlePrimaqveraveranoChange('Name')}
                        error={primaqveraveranoData?.errField === 'Name'}
                        helperText={primaqveraveranoData?.errField === 'Name' && primaqveraveranoData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Marca"
                        type="text"
                        fullWidth
                        className={'field_Marca'}
                        variant="standard"
                        value={Primaqveraveranodata.Marca || ''}
                        onChange={handlePrimaqveraveranoChange('Marca')}
                        error={primaqveraveranoData?.errField === 'Marca'}
                        helperText={primaqveraveranoData?.errField === 'Marca' && primaqveraveranoData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Desription"
                        type="text"
                        fullWidth
                        className={'field_Desription'}
                        variant="standard"
                        value={Primaqveraveranodata.Desription || ''}
                        onChange={handlePrimaqveraveranoChange('Desription')}
                        error={primaqveraveranoData?.errField === 'Desription'}
                        helperText={primaqveraveranoData?.errField === 'Desription' && primaqveraveranoData.errMessage}
                      />

                      <TextField
                        margin="dense"
                        label="Price"
                        className={'field_Price'}
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Primaqveraveranodata.Price || ''}
                        onChange={handlePrimaqveraveranoChange('Price')}
                      />
                    </LocalAddDialog>
                  </div>

                  <div title="Body">
                    <Table
                      tableHead={['Name', 'Marca', 'Desription', 'Price', 'Actions']}
                      tableData={
                        primaqveraveranoData.foundprimaqveraverano.length
                          ? primaqveraveranoData.foundprimaqveraverano
                          : (primaqveraveranoData.primaqveraverano as any)
                      }
                      orderBy={tableloadoptions.sort.field}
                      order={tableloadoptions.sort.method}
                      onRequestSort={(event, property) => {
                        settableloadoptions({
                          ...tableloadoptions,
                          sort: {
                            field: property,
                            method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'ASC',
                          },
                        })
                      }}
                    >
                      <Field value={(fieldData: any) => fieldData.Name} />

                      <Field value={(fieldData: any) => fieldData.Marca} />

                      <Field value={(fieldData: any) => fieldData.Desription} />

                      <Field value={(fieldData: any) => fieldData.Price} />
                      <div className={classes.actionsArea}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClickCapture={(e: any) => {
                            setPrimaqveraveranoData(e.element)
                            setdialogPrimaqveraveranoAction('edit')
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClickCapture={(e: any) => {
                            dispatch(removeSingleuntitled(e.element))
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </Table>
                  </div>
                </div>
              </Paper>
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default Primaqveraverano
