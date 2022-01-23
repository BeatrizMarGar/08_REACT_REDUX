import T from 'prop-types';

import useForm from '../../../hooks/useForm';

const validEmail = ({ email }) => email;
const validPassword = ({ password }) => password;

export function LoginForm({ onSubmit }) {
  const {
    formValue: credentials,
    handleChange,
    handleSubmit,
    validate,
  } = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const { email, password, remember } = credentials;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="email" value={email} onChange={handleChange} alt="email" />
      <input
        type="password"
        alt="password"
        name="password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="remember"
        alt="remember"
        checked={remember}
        onChange={handleChange}
      />
      <button disabled={!validate(validEmail, validPassword)}>Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default LoginForm;
