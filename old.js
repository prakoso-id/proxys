const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const app = express();
const port = 4000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index', {});
});

app.get('/book/:userId', (req, res) => {
    // We will be coding here
    proxy.web(req, res, { target: req.params.userId });
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));