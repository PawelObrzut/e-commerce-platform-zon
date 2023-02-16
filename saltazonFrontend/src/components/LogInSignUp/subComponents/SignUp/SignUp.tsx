import useStore from '../../../Hooks/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface SignUpFormInterface {
  email: string,
  password: string,
  confirmPassword: string,
  role: string
}

const SignUp = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), undefined]).required(),
    role: yup.string().required(),
  })

  const store = useStore(); 
  const { register, handleSubmit, reset } = useForm<SignUpFormInterface>({
    resolver: yupResolver(schema)
  });

  const submitSignUp = ({email, password, role} : SignUpFormInterface) => {
    store.signUp(email, password, role);
    reset();
  }

  return (
    <div className="frontbox--content">
      <h2>SIGN UP</h2>
      <form onSubmit={handleSubmit(submitSignUp)}>
        <input placeholder={"email"} {...register("email")}/>
        <input type="password" placeholder={"password"} {...register("password")} />
        <input type="password" placeholder={"confirm password"} {...register("confirmPassword")} />
        <select className="form--select" placeholder={"user"} {...register("role")}>
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
