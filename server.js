var express = require( 'express' );
var fs = require("fs"),
    json;

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

app.use( express.static( __dirname ) );


app.get('/alarms', function (req, res) {
  res.json( getConfig("alarms.json") );
});

app.post('/alarms', function (req, res) {
  console.log(req.name);
  res.send('Post World!');
});

app.delete('/alarms/:id', function (req, res) {
  console.log(req.id);
  res.send('Delete World!');
});

app.listen(5050, function () {
  console.log('Example app listening on port 5050!');
});
