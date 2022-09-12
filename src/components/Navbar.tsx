import React from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { useAppSelector } from '../redux'
import config from '../config'

const Navbar = () => {
    const history = useHistory()
    const logout = () => {
        window.open(`${config.API.URL}/api/auth/logout`, "_self")
    }

    const { isLoggedIn, user } = useAppSelector(store => store.auth)

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand" >Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" exact className="nav-link" activeClassName='active'>Home</NavLink>
                        </li>
                        {
                            isLoggedIn &&
                            <li className="nav-item">
                                <NavLink to="/create" activeClassName='active' className="nav-link">Sell product</NavLink>
                            </li>
                        }
                    </ul>

                    {
                        isLoggedIn
                            ?
                            <div>
                                <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                                    <a role="button" data-bs-toggle="offcanvas" href="#offcanvasExample" aria-controls="offcanvasExample" className='btn btn-primary'>cart</a>
                                    <li className="nav-item dropdown">
                                        <Link to="/" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user?.name}
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/" className="dropdown-item" >Profile</Link></li>
                                            <li><p onClick={logout} style={{ cursor: "pointer" }} className="dropdown-item" >Log out</p></li>
                                        </ul>
                                    </li>
                                </ul>

                            </div>
                            : <button onClick={() => history.push("/login")} className='btn btn-primary'>SIGN IN NOW</button>
                    }

                </div>
            </div>
        </nav >
    )
}

export default Navbar