const express = require('express');
const proxy = require('http-proxy-middleware');
const React = require('react');
const {renderToString} = require('react-dom/server');

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
  const SampleApp = () => {
    return (
      <div>This is sample app rendered on server</div>
    )
  };
  const renderedApp = renderToString(<SampleApp/>);

  res.send(`
<html>
<body>
    <div id="root">${renderedApp}</div>
</body>
</html>    
    `);
});

// start server
app.listen(5505, () => {
  console.info('SSR server is listening on port 5505');
});