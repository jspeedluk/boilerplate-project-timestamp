// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//const parseTime = require("./app/parseTime.js");
const moment  = require('moment');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//
/*app.get("/api/timestamp/:date?", function(req, res){
  
  var formats  = ['X','YYYY-MM-DD'];
  const date = moment(req.params.date, formats, true);

   let dateObj;

  if (date.isValid()) {
    dateObj = {
      unix: Number(date.format('X')),
      natural: date.format('MMMM D, YYYY')
    };
  } else {
    dateObj = {
      unix: null,
      natural: null
    };
  }
  
  
});*/
function isValidDate(d) {  
  return (d instanceof Date) ;
}

app.get('/api/timestamp/:date?',function(req,res) {
var date =new Date( req.params.date);
  if(isNaN(date)){
    var dt = new Date();
    res.json( {'unix':dt.getTime(),'utc':dt.toUTCString()});
  }
  if(isValidDate(date)){
      res.json({'unix':date.getTime(),'utc':date.toUTCString()}); 
  }else{
   res.json({'error':'Invalid Datee'}); 
  }
});
