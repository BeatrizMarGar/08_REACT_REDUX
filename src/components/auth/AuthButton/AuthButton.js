import { Link } from 'react-router-dom';
import T from 'prop-types';
import { ConfirmationButton } from '../../common';
import { authLogout } from '../../../store/actions';
import { getIsLogged } from '../../../store/selectors'
import useStoreData from '../../../hooks/useStoreData';
import useStoreAction from '../../../hooks/StoreActions';


const AuthButton = () => {

  const knowLogged = useStoreData(getIsLogged)
  const LogOutAct = useStoreAction(authLogout)

  return knowLogged ? (
    <ConfirmationButton
      confirmation="¿Seguro que quieres salir?"
      onConfirm={LogOutAct}
    >
      Desconectar
    </ConfirmationButton>
  ) : (
    <Link to="/login">Iniciar sesión</Link>
  );
};

AuthButton.propTypes = {
 // handleLogout: T.func.isRequired,
  isLogged: T.bool,
};

AuthButton.defaultProps = {
  isLogged: false,
};

/*
const ConnectedAuthButton = props => (
  <AuthConsumer>{auth => <AuthButton {...auth} {...props} />}</AuthConsumer>

  );
*/
//////
/*
const mapStateToProps = (state, ownProps) => {
  return {
    isLogged: state.auth,
  }
}
*/
/////
//export default connect(mapStateToProps)(ConnectedAuthButton);
export default AuthButton;
