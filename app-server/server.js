const express = require('express');
const proxy = require('http-proxy-middleware');

import React from 'react';
import {renderToString} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {Provider} from 'react-redux';

import {initializeStore} from '../src/store';

import App from '../src/App';

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
  const reduxStore = initializeStore();

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
  console.info('SSR server is listening on port 3000');
});