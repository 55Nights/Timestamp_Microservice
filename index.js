// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.json({"message":"hello"});
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// my code
app.get("/api/:date?", function(req, res) {
  let date = req.params.date;

  if (!date) {
    const currentDate = new Date();
    const utcString = currentDate.toUTCString();
    const milliseconds = currentDate.getTime();
    res.json({ "unix": milliseconds, "utc": utcString });
  } else if (!isNaN(date)) {
    const parsedDate = new Date(parseInt(date));
    if (!isNaN(parsedDate.getTime())) {
      const utcString = parsedDate.toUTCString();
      const milliseconds = parsedDate.getTime();
      res.json({ "unix": milliseconds, "utc": utcString });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      const utcString = parsedDate.toUTCString();
      const milliseconds = parsedDate.getTime();
      res.json({ "unix": milliseconds, "utc": utcString });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

