
//import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

const Root = ({ children, store, history }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
 
export default Root;