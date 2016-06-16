const express = require('express');
const proxy = require('http-proxy');
const app = express();
const curl = require('curlrequest');
const moment = require('moment');

const secrets = require('../secrets.json');

const port = 3000;

app.set('port', port);
app.use(express.static(__dirname + '/app'));

proxy.prototype.onError = (err) => {
    console.log(err);
}

const router = express.Router();
const api = proxy.createProxyServer({ changeOrigin: false });

router.use((req, res, next) => {
    console.log(moment().format('h:mm:ss a'), req.method, req.url);
    next();
});

router.get('/api/restaurants', (req, res) => {
    console.log('hi there!');
    // api.web(req, res, {
    //     target:
    //     'http://api.openweathermap.org/data/2.5/weather?APPID={0}&units={1}&q={2}'
    //         .replace('{0}', secrets.weatherKey)
    //         .replace('{1}', config.units)
    //         .replace('{2}', config.weather.city)
    // });
});

app.use('/', router);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});