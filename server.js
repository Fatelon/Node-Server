//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    eps     = require('ejs'),
    sql    = require('mssql'),
    mydb    = require('./database');
	
	
Object.assign=require('object-assign');

// create a write stream (in append mode) 
//var accessLogStream = fs.createWriteStream(__dirname + '/public/access.log', {flags: 'a'});


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

app.engine('html', require('ejs').renderFile);
app.use('', express.static(__dirname + '/public'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

  
var config = {
    user: 'DB_A1252A_fatelon_admin',
    password: '22091993!s',
    server: 'sql5027.smarterasp.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'DB_A1252A_fatelon',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}  
  
//mydb.addRowInTable(config, 'MyDev', '(17, 17)');
  
  
app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : null});
});

app.get('/log', function (req, res) {
  console.log('Go to /log');
  res.send('hello log');
});

app.post('/api/addmydev', function(req, res) {
    var id = req.body.id;
    var value = req.body.value;
    mydb.addRowInTable(config, 'MyDev', '(' + id + ', ' + value + ')');
    res.send(id + ' ' + value);
});

app.post('/api/adddevice', function(req, res) {
    var device_id = req.body.deviceid;
    var app_device_id = req.body.appdeviceid;
    var description = req.body.description;

    res.send(device_id + ' ' + app_device_id + ' ' + description);
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;