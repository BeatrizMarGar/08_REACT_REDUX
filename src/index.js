import React from 'react';
import ReactDOM from 'react-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/app';
import configureStore from './store';

import Root from './components/Root';


const accessToken = storage.get('auth');
configureClient({ accessToken });
const store = configureStore({ auth: !!accessToken});
// pasandole el token en el store, no necesito  isInitiallyLogged={!!accessToken}  en app


ReactDOM.render(
  <React.StrictMode>
    <Root store={store}>
        <App/>
    </Root>
  </React.StrictMode>,
  document.getElementById('root')
);
