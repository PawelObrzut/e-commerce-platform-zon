import useStore from '../../../Hooks/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface LogInFormInterface {
  email: string,
  password: string
}

const LogIn = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  })

  const store = useStore();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LogInFormInterface>({
    resolver: yupResolver(schema)
  });

  const sumbitLogIn = ({email, password}: LogInFormInterface) => {
    store.logIn(email, password);
    reset();
  }

  return (
    <div className="frontbox--content">
      <h2>LOG IN</h2>
      <form onSubmit={handleSubmit(sumbitLogIn)}>
        <input 
          placeholder={"email"} 
          {...register("email")} 
          className={`${errors.email ? 'invalid': null}`}
        />

        <input 
          type="password" placeholder={"password"} 
          {...register("password")} 
          className={`${errors.password ? 'invalid': null}`}
        />
        
        <input 
          className="submit--form" 
          type={"submit"} 
          value="LogIn" 
        />
      </form>
    </div>
  );
};

export default LogIn;
