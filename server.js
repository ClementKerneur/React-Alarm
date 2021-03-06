var express = require( 'express' );
var fs = require("fs"), json;
var bodyParser = require('body-parser');

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}
function getConfig(file){
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}


var app = express();

app.use( bodyParser.urlencoded({ extended: true })); 
app.use( bodyParser.json() );

app.use( express.static( __dirname ) );


app.get('/alarms', function (req, res) {

  if (!fs.existsSync("alarms.json")) {
    fs.writeFile( 'alarms.json', '[]' );
  }

  res.json( getConfig("alarms.json") );
});

app.post('/alarms', function (req, res) {
  var newAlarm = req.body;
  
  var resTmp = getConfig("alarms.json");
  resTmp.push(newAlarm);
  fs.writeFile( 'alarms.json', JSON.stringify(resTmp) );

  res.json( newAlarm );
});

app.patch('/alarms/:id', function (req, res) {
  var editAlarm = req.body;
  
  var resTmp = getConfig("alarms.json");
  resTmp[req.params.id] = editAlarm;
  fs.writeFile( 'alarms.json', JSON.stringify(resTmp) );

  res.json( editAlarm );
});

app.delete('/alarms/:id', function (req, res) {
  var resTmp = getConfig("alarms.json");
  resTmp.splice(req.params.id, 1);
  fs.writeFile( 'alarms.json', JSON.stringify(resTmp) );

  res.json( req.params.id );
});

app.listen(5050, function () {
  console.log('Example app listening on port 5050!');
});
