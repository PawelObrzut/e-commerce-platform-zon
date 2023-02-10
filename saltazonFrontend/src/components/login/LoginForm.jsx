
function LoginForm({ onSubmit, setEmail, setPassword }) {
  return (
      <>
        <h3>Login</h3>
        <form onSubmit={onSubmit} className={"login_form"}>
          <label htmlFor="email_input">Email</label>
          <input placeholder={"email"} id={"email_input"} onChange={event => setEmail(event.target.value)} />
          <br/>
          <label htmlFor="password_input">Password</label>
          <input placeholder={"password"} id={"password_input"} onChange={event => setPassword(event.target.value)}/>
          <br/>
          <input className="login_form_submit" type={'submit'} value="LogIn" />
        </form>
      </>
  )
}

export default LoginForm;