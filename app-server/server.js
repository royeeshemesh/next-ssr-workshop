const express = require('express');
const proxy = require('http-proxy-middleware');

const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handleNextRequests = nextApp.getRequestHandler();

nextApp.prepare()
  .then(() => {
    // create express app
    const app = express();

    app.use(proxy(['/api'],{
      target: 'http://localhost:8888/',
      changeOrigin: true,
      xfwd: true,
    }));

    app.use(handleNextRequests);

    // start server
    app.listen(3000, () => {
      console.info('SSR server is listening on port 3000');
    });
  });
