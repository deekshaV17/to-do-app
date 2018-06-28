import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './src/store/store';
import App from './src/components/App';

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
);

