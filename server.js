const express = require('express')
const app = express()
var fetch = require('node-fetch');


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'null');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/weather', function(req, res) {
	var endpoint = 'https://api.darksky.net/forecast/55b410cf02d986a74bb67a66e7057eae/40.016457, -105.285884?exclude=minutely,daily,hourly,alerts,flags';
	var darkSky;

	fetch(endpoint)
		.then(function(res) {
			return res.json();
		}).then(function(json) {
			darkSky = json;
		}).then(function(){
			res.send(darkSky);
		});
});

app.listen(3000, function () {
	console.log('Listening on port 3000!')
})
