import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { MuiThemeProvider } from '@material-ui/core/styles';

import rootReducer from './reducer';
import theme from './theme/theme';
import reportWebVitals from './reportWebVitals';

const loggerMiddleware = createLogger({ predicate: () => { return '__DEV__'; }, logErrors: false });

function configureStore(initialState) {
  const middlewares =  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  );

  const enhancer = compose(middlewares);
  return createStore(rootReducer, initialState, enhancer);
}

const store = configureStore({});

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter basename="/">
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
