const axios = require('axios');
const comments = require('express').Router();

comments.get('/', async (req, res) => {
  const result = await axios.get('https://jsonplaceholder.typicode.com/comments');
  res.status(200).send(result.data.splice(0, 30));
});

comments.get('/:commentId', async (req, res) => {
  const {commentId} = req.params;
  const result = await axios.get(`https://jsonplaceholder.typicode.com/posts/${commentId}`);
  res.status(200).send(result.data);
});

module.exports = comments;
