import React from 'react';
import T from 'prop-types';

import { login } from '../service';
import LoginForm from './LoginForm';
import useMutation from '../../../hooks/useMutation';
import { useSelector, useDispatch } from 'react-redux';
import {  authLogin } from '../../../store/actions';
import { getUi } from '../../../store/selectors'

function LoginPage() {
  const dispatch = useDispatch();
  
  const { isLoading, error, execute, resetError } = useMutation(login);
  
  //const isLoading = useSelector(getUi)

 // const ownpr = {location, history}

  const handleSubmit = credentials => {
    dispatch(authLogin(credentials))
    execute(credentials)
    /*
      .then(console.log(credentials))

      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      });
      */
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
