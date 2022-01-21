import React from 'react';
import T from 'prop-types';

import { login } from '../service';
import LoginForm from './LoginForm';
import useMutation from '../../../hooks/useMutation';
import { useDispatch } from 'react-redux';
import {  authLogin } from '../../../store/actions';

function LoginPage({ location, history }) {
  const dispatch = useDispatch();
  
  const { isLoading, error, execute, resetError } = useMutation(login);
  
  /*
  const handleLogin = (credentials) => {
    login()
      .then(credentials => dispatch(authLogin(credentials)))
      console.log(credentials)
      debugger
  }
*/

  const handleSubmit = credentials => {
    dispatch(authLogin(credentials))
    execute(credentials)
      .then(console.log(credentials))
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

export default LoginPage;
