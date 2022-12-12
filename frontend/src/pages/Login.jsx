import "./css/login.css"

function Login() {
  return (
    <div className="login-box">
      <h4>SignIn</h4>
      <form>
        <input type="email" name="email" placeholder="Enter your email" />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <input
          type="button"
          name="button"
          value="Enter"
        />
      </form>
    </div>
  );
}

export default Login;
