import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import RootReducer from './store/reducers/RootReducer'
import {saveStateLocally, getLocalState} from './store/utils/LocalStorageUtils'

//usecure setup to change for prod TODO
//document.cookie = "cookiename=cookievalue; expires= Thu, 21 Aug 2014 20:00:00 UTC"
const axios = require('axios')
axios.defaults.headers.common['token'] = document.cookie
const persistedState = getLocalState();
const store = createStore(RootReducer, persistedState )

store.subscribe(() => {
    saveStateLocally({
      currentProject: store.getState().currentProject,
      baseApi: store.getState().baseApi
    });
  });        

ReactDOM.render(<Provider store={store} ><App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
