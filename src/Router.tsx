import React, { useCallback, useEffect } from 'react'
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom'
import { Navbar } from './components'
import { GuardRoute } from './Guards'
import Home from './pages/Home'
import Login from './pages/Login'



const Router = () => {
  const isInLogIn = useLocation().pathname === '/login'

  return (
    <>
      {
        !isInLogIn &&
        <Navbar />
      }
      <div className='p-3'>
        <Switch>
          <GuardRoute component={Login} path="/login" />
          <Route component={Home} path="/" exact />
        </Switch>
      </div>
    </>
  )
}

export default Router