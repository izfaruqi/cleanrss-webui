import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './components/App';
import { Provider } from 'react-redux';
import state from './state/state';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={state}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
