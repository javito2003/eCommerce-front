import config from "../config"


const Login = () => {
    const loginFn = async() => {
        window.open(`http://ec2-177-71-251-4.sa-east-1.compute.amazonaws.com:3001/api/auth/google`, "_self")
    }

  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary" onClick={loginFn}>Login with GOOGLE</button>
    </div>
  )
}

export default Login
