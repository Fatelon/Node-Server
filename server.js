//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    eps     = require('ejs'),
    sql    = require('mssql');
//    mydb    = require('./database');
//    mysql   = require('mysql');
	
	
Object.assign=require('object-assign');

// create a write stream (in append mode) 
//var accessLogStream = fs.createWriteStream(__dirname + '/public/access.log', {flags: 'a'});

app.engine('html', require('ejs').renderFile);
//app.use(morgan('combined', {stream: accessLogStream}));

app.use('', express.static(__dirname + '/public'));


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

	
//winston.add(winston.transports.File, { filename: __dirname + '/public/winston.log' });	
	
  
//mydb.createMyConnection();
  
var config = {
    user: 'DB_A1252A_fatelon_admin',
    password: '22091993!s',
    server: 'sql5027.smarterasp.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'DB_A1252A_fatelon',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}

var connection1 = new sql.Connection(config, function(err) {
    // ... error checks 
    if (err != null) {
      console.log('err1 ' + err);
    }
    
    // Query 
 
    var request = new sql.Request(connection1); // or: var request = connection1.request(); 
    request.query('INSERT INTO DeviceSimCards VALUES (500, 500)', function(err, recordset) {
        // ... error checks 
 
        console.log('INSERT req ' + recordset);
    });
 
});
  
	
app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : null});
});

app.get('/log', function (req, res) {
  console.log('Go to /log');
  res.send('hello log');
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