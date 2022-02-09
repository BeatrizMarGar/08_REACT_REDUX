import React from 'react';
import T from 'prop-types';

import { login } from '../service';
import LoginForm from './LoginForm';
import useMutation from '../../../hooks/useMutation';
import { useDispatch } from 'react-redux';
import { authLogin, uiResetError } from '../../../store/actions';
import { getUi } from '../../../store/selectors'

import { connect } from 'react-redux';


export function LoginPage( { isLoading, error }) {
  
 // const { execute } = useMutation(login);

 // const ownpr = {location, history}

 const dispatch = useDispatch();
const resetError = () => {
    dispatch(uiResetError())
}

  const handleSubmit = credentials => {
    dispatch(authLogin(credentials))
   // execute(credentials)
    
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
/*
LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};
*/
const mapStatetoProps = state => {
  return getUi(state)
}

const ConnectedLoginPage = connect(
  mapStatetoProps,
)(LoginPage);

export default ConnectedLoginPage;
