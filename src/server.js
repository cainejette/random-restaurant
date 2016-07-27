const express = require('express');
const proxy = require('http-proxy');
const app = express();
const curl = require('curlrequest');
const moment = require('moment');
const Yelp = require('yelp');
var bodyParser = require('body-parser');
var NodeGeocoder = require('node-geocoder');

const secrets = require('../secrets.json');
var categories = require('../categories.json');

var yelp = new Yelp({
    consumer_key: secrets.consumer_key,
    consumer_secret: secrets.consumer_secret,
    token: secrets.token,
    token_secret: secrets.token_secret
});

var geocoder = NodeGeocoder({
  provider: 'google',
  httpAdapter: 'https',
  apiKey: secrets.gmaps,
});

const port = process.env.PORT || 3000;

app.set('port', port);
app.use(express.static(__dirname + '/app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

proxy.prototype.onError = (err) => {
    console.log(err);
}

const router = express.Router();
const api = proxy.createProxyServer({ changeOrigin: false });

router.use((req, res, next) => {
    console.log(moment().format('h:mm:ss a'), req.method, req.url);
    next();
});

router.post('/api/restaurants', (req, res) => {
    console.log('searching for restaurants near: ' + req.body.address);
    var filters = req.body.filters.join();
    yelp.search({ 
            category_filter: 'restaurants,' + filters,
            location: req.body.address,
            radius_filter: req.body.radius,
        }).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.error(err);
        });
});

router.post('/api/coordinates', (req, res) => {
    geocoder.reverse({ lat: req.body.lat, lon: req.body.long })
        .then(address => res.send(address))
        .catch(err => console.error(err));
});

router.get('/api/categories', (req, res) => {
    res.send(categories);
})

app.use('/', router);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});