const axios = require('axios');
const users = require('express').Router();

users.get('/', async (req, res, next) => {
  try {
    const result = await axios.get('https://jsonplaceholder.typicode.com/users');
    res.status(200).send(result.data);
  } catch (error) {
    next(error);
  }
});

users.get('/:userId/posts/top5', async (req, res, next) => {
  const {userId} = req.params;
  try {
    const result = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    res.status(200).send(result.data && result.data.length && result.data.splice(0,5));
  } catch (e) {
    next(e);
  }
});

users.get('/:userId/posts', async (req, res, next) => {
  const {userId} = req.params;
  try {
    const result = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    res.status(200).send(result.data);
  } catch (e) {
    next(e);
  }
});

users.get('/:userId/comments/top5', async (req, res, next) => {
  const {userId} = req.params;
  try {
    const result = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/comments`);
    res.status(200).send(result.data && result.data.length && result.data.splice(0,5));
  } catch (e) {
    next(e);
  }
});

users.get('/:userId/comments', async (req, res, next) => {
  const {userId} = req.params;
  try {
    const result = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/comments`);
    res.status(200).send(result.data);
  } catch (e) {
    next(e);
  }
});

users.get('/:userId', async (req, res, next) => {
  const {userId} = req.params;
  try {
    const result = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    res.status(200).send(result.data);
  } catch (e) {
    next(e);
  }
});

module.exports = users;