const axios = require('axios');
const posts = require('express').Router();

posts.get('/', async (req, res) => {
  const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
  res.status(200).send(result.data.splice(0, 30));
});

posts.get('/:postId', async (req, res) => {
  const {postId} = req.params;
  const result = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  res.status(200).send(result.data);
});

module.exports = posts;