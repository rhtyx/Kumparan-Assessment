/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const articlesApi = require('./packages/articles/api/articlesApi');
const authorsApi = require('./packages/authors/api/authorsApi');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static('public'));

app.use('/api', authorsApi);
app.use('/api', articlesApi);

app.listen(3000, () => {
  console.log('Server is listening to port 3000');
});
