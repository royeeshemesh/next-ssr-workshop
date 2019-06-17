const express = require('express');
const proxy = require('http-proxy-middleware');

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
app.get('*', (req, res) => {
  res.send(`
<html>
<body>
    <div id="root"></div>
    <script src="/client-bundle.js"></script>
</body>
</html>    
    `);
});

// start server
app.listen(3000, () => {
  console.info('SSR server is listening on port 3000');
});