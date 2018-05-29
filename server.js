// init project
const express = require('express');
const rp = require('request-promise-native');
const app = express();

app.set('json spaces', 2);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});

app.get("/all/:filterBy/average_cw/", async (request, response) => {
    try {
        const filterBy = request.params['filterBy'];
        const startPage = '/api/products/1';
        const objArray = await recursivelyGetResults(startPage);
        const filtered = filterObjArray(objArray, filterBy);
        const cubicWeights = calculateCubicWeights(filtered);
        const average = calculateAverage(cubicWeights);
        response.json(average);
    } catch (err) {
        response.send(err.toString());
    }
});

app.get("/all/:filterBy", async (request, response) => {
    try {
        const filterBy = request.params['filterBy'];
        const startPage = '/api/products/1';
        const objArray = await recursivelyGetResults(startPage);
        const filtered = filterObjArray(objArray, filterBy);
        response.json(filtered);
    } catch (err) {
        response.send(err.toString());
    }
});

app.get("/all", async (request, response) => {
    try {
        const startPage = '/api/products/1';
        const objArray = await recursivelyGetResults(startPage);
        response.json(objArray);
    } catch (err) {
        response.send(err.toString());
    }
});

function calculateAverage(cubicWeights) {
    const numWeights = cubicWeights.length;
    return cubicWeights.reduce((acc, cur) => acc + cur) / numWeights;
}

function calculateCubicWeights(filtered) {
    return filtered.map(el => {
        let cubic_cm = el.size.width * el.size.height * el.size.length;
        let cubic_m = cubic_cm * Math.pow(10,-6);
        let conversionFactor = 250;
        return cubicWeight = cubic_m * conversionFactor;
    });
}

function filterObjArray(objList, filterBy) {
    const filtered = objList.filter(el => el.category === filterBy);
    if(filtered.length < 1)
        throw "ERR: No results matching the filter: " + filterBy;
    return filtered;
}

async function recursivelyGetResults(page, results1=[]) {
    console.log("Polling api for page: " + page);
    try {
        const results = await getPageFromApi(page);
        Array.prototype.push.apply(results1, results.objects);
        if (results.next) {
            const nextResults = await recursivelyGetResults(results.next, results1);
            Array.prototype.push.apply(results1, nextResults.objects);
        }
    }
    catch (e) {
        console.log(e.toString());
    }
    return results1;
}

function getPageFromApi(page) {
    const host = `http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com`;
    return new Promise((resolve,reject) => {
        const options = {
            uri: host + page,
            json: true
        };
        rp(options)
            .then((data) => resolve(data))
            .catch((err) => reject(err));
    })
}

// listen for requests :)
const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
