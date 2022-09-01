import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAppSelector } from '../redux'

interface IProp {
    component: React.ComponentType
    path: string
}

const PrivateRoute = ({ component, path, ...rest }: IProp) => {
    const { isLoggedIn } = useAppSelector(store => store.auth)
    
    if(isLoggedIn) {
        return <Route path={path} component={component} {...rest} />
    } else {
        return <Redirect to="/" />
    }
}

export default PrivateRoute