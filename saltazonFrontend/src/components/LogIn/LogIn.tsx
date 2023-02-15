import useStore from '../Hooks/store';

const LogIn = () => {
  const store = useStore();

  return (
    <div className="login">
      <h2>LOG IN</h2>
      <form onSubmit={store.handleLogIn}>
        <input onChange={(event) => store.setEmail(event.target.value)} placeholder={"email"} />
        <input onChange={(event) => store.setPassword(event.target.value)} type="password" placeholder={"password"} />
        <input className="submit--form" type={"submit"} value="LogIn" />
      </form>
    </div>
  );
};

export default LogIn;
