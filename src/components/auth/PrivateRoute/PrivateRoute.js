import {connect} from 'react-redux'
import { Redirect, Route, useLocation } from 'react-router-dom';

const PrivateRoute = ({isLogged, ...props}) => {
  const location = useLocation();

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};

//mapstate se ejecuta cada vez que haya un cambio de estado
const mapStateToProps = (state) => {
  return {
    isLogged: state.auth,
  }
}

export default connect(mapStateToProps)(PrivateRoute);
