const express = require('express')
const app = express()

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
	res.send('This is the weather route. We\'ll get you some WX yo!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
