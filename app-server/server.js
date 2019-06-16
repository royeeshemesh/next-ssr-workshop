const express = require('express');
const next = require('next');

const app = express();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
  dev
});

const handleNextRequests = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {

    app.use(handleNextRequests);

    app.listen(3000, () => {
      console.info(`app server is listening in port 3000`);
    });

  });

