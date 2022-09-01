import { Route, Switch, useLocation } from 'react-router-dom'
import { Navbar } from './components'
import { GuardRoute, PrivateRoute } from './Guards'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Create from './pages/Create'
import Home from './pages/Home'
import Login from './pages/Login'



const Router = () => {
  const isInLogIn = useLocation().pathname === '/login'
  return (
    <>
      {
        !isInLogIn &&
        <>
          <Navbar />
        </>
      }
      <ToastContainer />
      <div className='p-3'>
        <Switch>
          <Route component={Home} path="/" exact />
          <GuardRoute component={Login} path="/login" />
          <PrivateRoute component={Create} path="/create" />
        </Switch>
      </div>
    </>
  )
}

export default Router