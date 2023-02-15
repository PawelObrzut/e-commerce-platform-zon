import useStore from '../Hooks/store';

const SignUp = () => {
  const store = useStore();

  return (
    <div className="signup">
      <h2>SIGN UP</h2>
      <form onSubmit={store.handleSignUp}>
        <input onChange={(event) => store.setEmail(event.target.value)} placeholder={"email"} />
        <input onChange={(event) => store.setPassword(event.target.value)} type="password" placeholder={"password"} />
        <input placeholder={"confirm password"} />
        <select onChange={(event) => store.setRole(event.target.value)} className="form--select" placeholder={"user"} >
          <option value={"user"}>User</option>
          <option value={"admin"}>Admin</option>
        </select>
        <br />
        <br />
        <input className="submit--form" type={"submit"} value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;
