const express = require('express');
const proxy = require('http-proxy');
const app = express();
const curl = require('curlrequest');
const moment = require('moment');
const Yelp = require('yelp');
var bodyParser = require("body-parser");


const secrets = require('../secrets.json');

var yelp = new Yelp({
    consumer_key: secrets.consumer_key,
    consumer_secret: secrets.consumer_secret,
    token: secrets.token,
    token_secret: secrets.token_secret
});

const port = 3000;

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
    var address = req.body.address;
    yelp.search({ 
            term: 'food', 
            location: address,
            radius_filter: 1000 
        }).then(function (data) {
            console.dir(data);
            res.send(data);
        }).catch(function (err) {
            console.error(err);
        });
});

app.use('/', router);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});