import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {initializeStore} from './store';
import App from './App';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/',
  withCredentials: true
});

const reduxStore = initializeStore(window.INITIAL_STATE, axiosInstance);

ReactDOM.hydrate(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);