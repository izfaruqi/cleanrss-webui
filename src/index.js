import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import { Provider } from 'react-redux'
import App from './components/App';
import store from './state/store';

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
);
