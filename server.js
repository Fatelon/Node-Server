//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    eps     = require('ejs'),
    sql     = require('mssql'),
	//async   = require("async"),
    mydb    = require('./database');
	
	
Object.assign=require('object-assign');

// create a write stream (in append mode) 
//var accessLogStream = fs.createWriteStream(__dirname + '/public/access.log', {flags: 'a'});


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.engine('html', eps.renderFile);
app.use('', express.static(__dirname + '/public'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

  
var config = {
    user: 'DB_A1252A_fatelon_admin',
    password: 'adminpass!1',
    server: 'sql5027.smarterasp.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'DB_A1252A_fatelon',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}  

//mydb.selectDataPackages(config, function (recordset) {
//	var r = JSON.stringify(recordset);
//	console.log(JSON.parse('{"contacts": ' + r + '}'));
//	});

var iccid = "fasdf";
var datapackageid = 1212;
var timestamp = new Date().toISOString();
var approved = 1;
var comments = "request automatic approved on server";
var tableName = 'Requests (iccid,dataPackageId,timestamp,approved,comments)'
var parameters = '(\'' + iccid + '\', \'' + datapackageid + '\', \'' + timestamp + '\', \'' + approved + '\', \'' + comments + '\')';
var queryText = 'INSERT INTO ' + tableName + ' VALUES ' + parameters;
mydb.dBInsert(config, queryText, function (recordset) {
	console.log(recordset);
});

//mydb.addRowInTable(config, 'MyDev', '(17, 17)');
  
  
  
  
app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : null});
});

app.get('/log', function (req, res) {
  console.log('Go to /log');
  res.status(200).send('');
//  res.send('{"status": [{"st": "ok"]}}');
});

app.post('/adddevice', function (req, res) {
  var deviceid = req.body.deviceid;
  var appdeviceid = req.body.appdeviceid;
  var description = req.body.description;
  var iccid = req.body.iccid;var msisdn = req.body.msisdn;
  var imei = req.body.imei;
  var network = req.body.network;
  var active = req.body.active;
  var dateadded = req.body.dateadded;
  mydb.addRowInTable(config, 'Devices', '(\'' + deviceid + '\', \'' + appdeviceid + '\', \'' + description + '\')');
  mydb.addRowInTable(config, 'DeviceSimCards', '(\'' + deviceid + '\', \'' + iccid + '\')');
  mydb.addRowInTable(config, 'SimCards', '(\'' + iccid + '\', \'' + msisdn + '\', \'' + imei + '\', \'' + network + '\', \'' + active + '\', \'' + dateadded + '\')');
  
});

app.get('/packagesizes', function (req, res) {
  mydb.selectDataPackages(config, function (recordset) {
	res.json(recordset);
	});
});

app.post('/api/addmydev', function(req, res) {
    var id = req.body.id;
    var value = req.body.value;
    mydb.addRowInTable(config, 'MyDev', '(' + id + ', ' + value + ')');
    res.json(req.body);
//    res.send(id + ' ' + value);
});

app.post('/api/devices/addrow', function(req, res) {
    var deviceid = req.body.deviceid;
    var appdeviceid = req.body.appdeviceid;
    var description = req.body.description;
    mydb.addRowInTable(config, 'Devices', '(\'' + deviceid + '\', \'' + appdeviceid + '\', \'' + description + '\')');
    res.json(req.body);
});

app.post('/api/devicesimcards/addrow', function(req, res) {
    var deviceid = req.body.deviceid;
    var iccid = req.body.iccid;
    mydb.addRowInTable(config, 'DeviceSimCards', '(\'' + deviceid + '\', \'' + iccid + '\')');
    res.json(req.body);
});

app.post('/api/simcards/addrow', function(req, res) {
    var iccid = req.body.iccid;
    var msisdn = req.body.msisdn;
    var imei = req.body.imei;
    var network = req.body.network;
    var active = req.body.active;
    var dateadded = req.body.dateAdded;
    mydb.addRowInTable(config, 'SimCards', '(\'' + iccid + '\', \'' + msisdn + '\', \'' + imei + '\', \'' + network + '\', \'' + active + '\', \'' + dateadded + '\')');
    res.json(req.body);
});

app.post('/api/sms/addrow', function(req, res) {
    var smsid = req.body.smsId;
    var iccid = req.body.iccid;
    var message = req.body.message;
    var fromnumber = req.body.fromnumber;
    var timestamp = req.body.timestamp;
    mydb.addRowInTable(config, 'SMS', '(\'' + smsid + '\', \'' + iccid + '\', \'' + message + '\', \'' + fromnumber + '\', \'' + timestamp + '\')');
    res.json(req.body);
});

app.post('/api/simcarddatapackages/addrow', function(req, res) {
    var simcarddatapackageid = req.body.simcarddatapackageid;
    var datefrom = req.body.datefrom;
    var dateto = req.body.dateto;
    var active = req.body.active;
    var requestid = req.body.requestid;
    mydb.addRowInTable(config, 'SMS', '(\'' + simcarddatapackageid + '\', \'' + datefrom + '\', \'' + dateto + '\', \'' + active + '\', \'' + requestid + '\')');
    res.json(req.body);
});

app.post('/api/usage/addrow', function(req, res) {
    var usageid = req.body.usageid;
    var simcarddatapackageid = req.body.simcarddatapackageid;
    var timestamp = req.body.timestamp;
    var sent = req.body.sent;
    var received = req.body.received;
    var total = req.body.total;
    mydb.addRowInTable(config, 'Usage', '(\'' + usageid + '\', \'' + simcarddatapackageid + '\', \'' + timestamp + '\', \'' + sent + '\', \'' + received + '\', \'' + total + '\')');
    res.json(req.body);
});

app.post('/api/requests/addrow', function(req, res) {
    var iccid = req.body.iccid;
    var datapackageid = req.body.datapackageid;
    var timestamp = new Date().toISOString();
    var approved = 1;
    var comments = "request automatic approved on server";
	var tableName = 'Requests (iccid,dataPackageId,timestamp,approved,comments)'
	var parameters = '(\'' + iccid + '\', \'' + datapackageid + '\', \'' + timestamp + '\', \'' + approved + '\', \'' + comments + '\')';
	var queryText = 'INSERT INTO ' + tableName + ' VALUES ' + parameters;
    mydb.dBInsert(config, queryText, function (recordset) {
		res.json(recordset);
	});
});

app.post('/api/datapackages/addrow', function(req, res) {
    var datapackageid = req.body.datapackageid;
    var description = req.body.description;
    var sizebytes = req.body.sizebytes;
    mydb.addRowInTable(config, 'DataPackages', '(\'' + datapackageid + '\', \'' + description + '\', \'' + sizebytes + '\')');
    res.json(req.body);
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;