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

  const allData = matchRoutes(Routes, req.path).map(async routeMatch =>{
    const {route, match} = routeMatch;
    return (route.component.getData && typeof route.component.getData === 'function') ? route.component.getData(reduxStore, match.params) : Promise.resolve()
  });

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
    <head>
        <style>
            html,
            body {
              padding: 0;
              margin: 0;
            }
            
            .container {
              max-width: 1400px;
              margin: 0 auto;
            }
            
            .home-intro {
              background-color: #fafafa;
              border-radius: 15px;
              padding: 30px 50px;
              border: 1px solid lightgray;
            }
            
            .brand {
              font-size: 24px;
              font-weight: bold;
            }
            
            .navigation {
              margin-top: 5px;
            }
            
            .navigation a {
              padding: 10px;
              border-radius: 5px;
              display: inline-block;
              font-size: 18px;
              text-decoration: none;
            }
            
            .navigation a:hover {
              background-color: #f4f4f4;
            }
            
            .flex {
              display: flex;
            }
            
            .flex-any {
              flex: 1;
            }
            
            .flex-any:first-child {
              margin-right: 15px;
              padding-right: 15px;
              border-right: 1px solid lightgray;
            }
            
            .posts-list {
              margin: 0;
              padding: 0;
              list-style: none;
            }
            
            .posts-list li {
              padding: 20px;
              background-color: #fafafa;
              border-radius: 10px;
              margin-bottom: 15px;
              border: 1px solid lightgray;
            }
            
            .comments-list {
              margin: 0;
              padding: 0;
              list-style: none;
            }
            
            .comments-list li {
              padding: 20px;
              background-color: #fafafa;
              border-radius: 10px;
              margin-bottom: 15px;
              border: 1px solid lightgray;
            }
            
            .search-box {
              display: block;
              padding: 10px 5px;
              font-size: 16px;
              border-radius: 5px;
              min-width: 400px;
              margin-bottom: 15px;
            }
            
            .users {
              display: flex;
            }
            
            .user-details-wrapper {
              margin-left: 15px;
              padding-left: 15px;
              border-left: 1px solid lightgray;
            }
            
            .users-list-wrapper {
              position: relative;
            }
            
            .loader {
              position: absolute;
              width: 100%;
              height: 100%;
              background-color: white;
              opacity: 0.5;
              top: 0;
              left: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            
            .users-list {
              margin: 0;
              padding: 0;
              list-style: none;
              min-width: 300px;
            }
            
            .users-list li {
              padding: 15px 20px 15px 0;
              cursor: pointer;
            }
            
            .users-list li a {
              text-decoration: none;
              color: #555555;
            }
            
            .users-list li:hover {
              background-color: #f7f7f7;
            }
            
            .users-list li:active {
              background-color: #e8e8e8;
            }
            
            .users-list li.selected {
              font-weight: bold;
              background-color: #e8e8e8;
              padding-left: 20px;
            }
            
            .users-list li:not(:first-child) {
              border-top: 1px solid lightgray;
            }
            
            .user-details-wrapper {
              flex: 1;
            }
            
            .user-details-table {
              width: 100%;
              table-layout: fixed;
            }
            
            .user-details-table td {
              padding: 10px 20px 10px 0;
              font-size: 18px;
            }
            
            .user-details-table td:nth-child(3) {
              padding-left: 15px;
            }
            
            .user-details-table td:nth-child(even) {
              font-weight: bold;
            }          
        </style>
    </head>
<body>
    <div id="root">${renderedApp}</div>
    <script>
      window.INITIAL_STATE = ${JSON.stringify(reduxStore.getState())};
    </script>
    <script src="/client-bundle.js"></script>
</body>
</html>    
    `);
});

// start server
app.listen(3000, () => {
  console.info('SSR server is listening on port 3000');
});