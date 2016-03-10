import React from 'react';
import { Provider } from 'react-redux';
import styles from './App.css';
import configureStore from '../../store/configureStore';
import HarUploadContainer from '../HarUploadContainer/HarUploadContainer';
import HarChartsContainer from '../HarChartsContainer/HarChartsContainer';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div>
      <HarUploadContainer />
      <HarChartsContainer />
    </div>
  </Provider>
);

export default App;
