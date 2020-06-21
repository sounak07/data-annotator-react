import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import {
  createStore, applyMiddleware, combineReducers, compose,
} from 'redux';
import App from './App';
import authReducer from './store/reducers/auth';
import errorReducer from './store/reducers/errorRed';
import imgReducer from './store/reducers/imgsRed';
import loadingRed from './store/reducers/loading';

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  imgs: imgReducer,
  load: loadingRed,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
