import { Link } from 'react-router-dom';
import T from 'prop-types';
import { connect } from 'react-redux';
import { ConfirmationButton } from '../../common';
//import { AuthConsumer } from '../context';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../service';
import useMutation from '../../../hooks/useMutation';
import { authLogout } from '../../../store/actions';
import { getIsLogged } from '../../../store/selectors'


const AuthButton = ({ handleLogou }) => {
//const AuthButton = ({ handleLogout }) => {
  const mutation = useMutation(logout);
  
  const isLogged = useSelector(getIsLogged)
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    logout().then(() => dispatch(authLogout()))
  }

  const handleLogoutConfirm = async () => {
    await mutation.execute();
    handleLogout();
  };

  return isLogged ? (
    <ConfirmationButton
      confirmation="Are you sure?"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </ConfirmationButton>
  ) : (
    <Link to="/login">Login</Link>
  );
};

AuthButton.propTypes = {
  handleLogout: T.func.isRequired,
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
