import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import { application, initialState } from './reducers'


const composeEnhancers = (process.env.ENVIRONMENT && process.env.ENVIRONMENT === 'local' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
let store = createStore(application, initialState, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    	<App/>
		</Provider>
    </BrowserRouter>,
  
  document.getElementById('root')
);


serviceWorker.unregister();
