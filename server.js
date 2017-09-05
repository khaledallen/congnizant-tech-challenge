const express = require('express')
const app = express()
var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'null');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.post('/weather', jsonParser, function(req, res) {
	console.log(req.body);
	var endpoint = 'https://api.darksky.net/forecast/55b410cf02d986a74bb67a66e7057eae/';
	endpoint += req.body.latitude;
	endpoint += ',';
	endpoint += req.body.longitude;
	endpoint += '?exclude=minutely,daily,hourly,alerts,flags';
	console.log(endpoint);

	var darkSky;

	fetch(endpoint)
		.then(function(res) {
			return res.json();
		}).then(function(json) {
			darkSky = json;
			console.log(darkSky);
		}).then(function(){
			res.send(darkSky);
		});
});

app.listen(3000, function () {
	console.log('Listening on port 3000!')
})
