import React from 'react';
import { Provider } from 'react-redux';
import styles from './App.css';
import configureStore from '../../store/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div>
      this is a test
    </div>
  </Provider>
);

export default App;
