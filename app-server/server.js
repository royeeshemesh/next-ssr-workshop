const express = require('express');
const proxy = require('http-proxy-middleware');

import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import {Provider} from 'react-redux';

import {initializeStore} from '../src/store';

import App from '../src/App';
import Routes from '../src/Routes';

import axios from 'axios';

// create express app
const app = express();

// set public folder as express static assets
app.use(express.static('public', {index: false}));

app.use(proxy(['/api'],{
  target: 'http://localhost:8888/',
  changeOrigin: true,
  xfwd: true,
}));

// listen to root request
app.get('*', async (req, res) => {
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8888/',
    withCredentials: true,
    headers: {...req.headers }
  });

  const reduxStore = initializeStore({}, axiosInstance);

  const allData = matchRoutes(Routes, req.path).map(async ({route})=>(route.component.getData && typeof route.component.getData === 'function') ? route.component.getData(reduxStore) : Promise.resolve());
  await Promise.all(allData);

  console.info('done all');

  const renderedApp = renderToString(
    <Provider store={reduxStore}>
      <StaticRouter location={req.path} context={{}}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  res.send(`
<html>
<body>
    <div id="root">${renderedApp}</div>
    <script src="/client-bundle.js"></script>
</body>
</html>    
    `);
});

// start server
app.listen(3000, () => {
  console.info('SSR server is listening on port 5505');
});