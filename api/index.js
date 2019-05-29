const express = require('express');
const app = express();
const port = 8888;

const usersRoute = require('./users');
const postsRoute = require('./posts');
const commentsRoute = require('./comments');

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/comments', commentsRoute);

app.use((error, req, res, next) => {
  res.send(error.message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));