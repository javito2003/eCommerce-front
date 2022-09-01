import config from "../config"


const Login = () => {
    const loginFn = async() => {
        window.open(`${config.API.URL}/api/auth/google`, "_self")
    }

  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary" onClick={loginFn}>Login with GOOGLE</button>
    </div>
  )
}

export default Login