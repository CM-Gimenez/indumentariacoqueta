import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Producto = React.lazy(() => import('./Pages/Producto'))
const Users = React.lazy(() => import('./Pages/Users'))
const Admin = React.lazy(() => import('./Pages/Admin'))
const LoginPage = React.lazy(() => import('./Pages/login'))
const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/Producto',
      name: 'Producto',
      component: Producto,
    },
    {
      path: '/Users',
      name: 'Users',
      component: Users,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/login',
      name: 'Login Page',
      component: LoginPage,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
