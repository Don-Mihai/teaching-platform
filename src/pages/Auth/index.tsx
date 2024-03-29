import { useState } from 'react';
import './Auth.scss';
import { AUTH_MODE, PRegister, initValues } from './types';
import SubLink from './SubLink';
import Register from './Register';
import Login from './Login';
import GoogleAuth from '../../components/GoogleAuth';

const Auth = () => {
  const [formValues, setFormValues] = useState<Partial<PRegister>>(initValues);
  const [mode, setMode] = useState<AUTH_MODE>(AUTH_MODE.LOGIN);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const onLoginLink = () => {
    setMode(AUTH_MODE.LOGIN);
  };

  const onRegLink = () => {
    setMode(AUTH_MODE.REGISTER);
  };

  return (
    <div className="auth">
      <GoogleAuth />
      {mode === AUTH_MODE.REGISTER ? <Register formValues={formValues} onChange={onChange} /> : <Login formValues={formValues} onChange={onChange} />}
      {mode === AUTH_MODE.REGISTER ? (
        <SubLink text="Alredy signed up?" onClick={onLoginLink} linkText="Sign in" />
      ) : (
        <SubLink text="No account?" onClick={onRegLink} linkText="Sign up" />
      )}
    </div>
  );
};

export default Auth;
