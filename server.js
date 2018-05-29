// server.js
// where your node app starts

// init project
var express = require('express');
var rp = require('request-promise-native');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/products/:page", async function (request, response) {
  const page = request.params['page'];
  const results = await getPageFromApi(page);
  // const filtered = filterResults(results, "Air Conditioners");
  // const calculated = calculateCubicWeight(filtered);
  response.send(results);
});

function getPageFromApi(page) {
  const apiEndPoint = `http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/${page}`
  return new Promise((resolve,reject) => {
    var options = {
      uri: apiEndPoint,
      json: true
    };
    rp(options)
      .then((data) => resolve)
      .catch((err) => reject);
  })
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
