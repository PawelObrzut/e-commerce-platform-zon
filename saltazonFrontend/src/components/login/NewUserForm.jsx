
function NewUserForm({ onSubmit, setEmail, setPassword, setRole }) {
  return (
      <>
        <h3>Create new user</h3>
        <form onSubmit={onSubmit} className={"create_user_form"}>
          <br/>
          <label htmlFor="email_input">Email</label>
          <input placeholder={"email"} id={"email_input"} onChange={event => setEmail(event.target.value)} />
          <br/>
          <label htmlFor="password_input">Password</label>
          <input placeholder={"password"} id={"password_input"} onChange={event => setPassword(event.target.value)} />
          <br/>
          <label htmlFor="confirmed_password_input">Confirm password</label>
          <input placeholder={"confirm password"} id={"confirmed_password_input"}/>
          <br/>
          <label htmlFor="type_input">Type of User</label>
          <select placeholder={"user"} id={"type_input"} onChange={event => setRole(event.target.value)}>
            <option value={"user"}>User</option>
            <option value={"admin"}>Admin</option>
          </select>
          <input type={'submit'} className="create_user_form_submit" value="Sign Up"/>
        </form>
      </>
  )
}

export default NewUserForm;