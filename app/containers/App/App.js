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

var thing = {
  blocked: 0.952999999753956,
  dns: -1,
  connect: -1,
  send: 0.08699999989403406,
  wait: 81.45000000013171,
  receive: 63.79599999991113,
  ssl: -1,
};
