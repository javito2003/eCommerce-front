import React from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { useAppSelector } from '../redux'

interface IProp {
    component: React.ComponentType
    path: string
    rest?: RouteComponentProps
}

const GuardRoute = ({ component, path, ...rest }: IProp) => {
  const { isLoggedIn } = useAppSelector(store => store.auth)
  if(isLoggedIn) {
    return <Redirect to="/" {...rest} />
  } else {
    return <Route path={path} component={component} {...rest} />
  }
}

export default GuardRoute