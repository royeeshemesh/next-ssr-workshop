const express = require('express');

// create express app
const app = express();

// set public folder as express static assets
app.use(express.static('public', {index: false}));

// listen to root request
app.get('*', (req, res) => {
  res.send(`
<html>
<body>
    <div id="root"></div>
    <script src="client-bundle.js"></script>
</body>
</html>    
    `);
});

// start server
app.listen(5505, () => {
  console.info('SSR server is listening on port 5505');
});