// server.js
// where your node app starts

// init project
var express = require('express');
const moment = require('moment')
const PORT = process.env.port || 3000
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.json())

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.send({greeting: 'hello API'});
});

app.get('/api/timestamp', (req,res) => {
    const now = moment.utc()
    const resp = {
        unix: now.valueOf(),
        utc: now.format('ddd, D MMM YYYY HH:mm:ss') + ' GMT'
    }
    return res.status(200).send(resp)
})

app.get('/api/timestamp/:date', (req,res) => {
    let date = req.params.date
    if (isNaN(date)){
        date = moment.utc(new Date(req.params.date))
    } else {
        date = moment.utc(Number(date))
    }
    if (date.isValid() === false){
        return res.status(400).send({error:'Invalid Date'})
    }
    const resp = {
        unix: date.valueOf(),
        utc: date.format('ddd, DD MMM YYYY HH:mm:ss') + ' GMT'
    }
    return res.status(200).send(resp)

})

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});
