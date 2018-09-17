const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyparser.json());
app.use('/dist',express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log("Server start on port "+port+"   Dirname= "+__dirname);
