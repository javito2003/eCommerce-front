

const Login = () => {
    const loginFn = async() => {
        window.open("http://localhost:3001/api/auth/google", "_self")
    }

  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary" onClick={loginFn}>Login with GOOGLE</button>
    </div>
  )
}

export default Login