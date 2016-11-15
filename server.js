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

//var port = 8080,
	//ip   = '127.0.0.1';
  
var config = {
    user: 'DB_A1252A_fatelon_admin',
    password: 'adminpass!1',
    server: 'sql5027.smarterasp.net', 
    database: 'DB_A1252A_fatelon',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}  

//var dbName 	  = 'SimCardDataPackages',
	//param     = 'active=0',  
	//condition = 'simCardDataPackageId=4';
//mydb.dbUpdate(config, dbName, param, condition, function (recordset) {
	//console.log(recordset);
  //});
  
app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : null});
});

app.get('/log', function (req, res) {
  console.log('Go to /log');
  res.status(200).send('');
});

app.get('/getrequests', function (req, res) {
  var iccid = req.query.iccid;
  mydb.getRequests(config, iccid, function (recordset) {
	res.json(recordset);
  });
});

app.get('/packagesizes', function (req, res) {
  mydb.selectDataPackages(config, function (recordset) {
	res.json(recordset);
	});
});

app.get('/simcarddatapackages', function (req, res) {
  var requestId = req.query.requestid;
  mydb.getSimCardDataPackages(config, requestId, function (recordset) {
	res.json(recordset);
	});
});

app.post('/addnewdevice', function (req, res) {
  var deviceid = req.body.deviceid;
  var appdeviceid = req.body.appdeviceid;
  var description = req.body.description;
  var iccid = req.body.iccid;
  var msisdn = req.body.msisdn;
  var imei = req.body.imei;
  var network = req.body.network;
  var active = 1;
  var dateadded = new Date().toISOString();
  mydb.addRowInTable(config, 'Devices', '(\'' + deviceid + '\', \'' + appdeviceid + '\', \'' + description + '\')');
  mydb.addRowInTable(config, 'DeviceSimCards', '(\'' + deviceid + '\', \'' + iccid + '\')');
  mydb.addRowInTable(config, 'SimCards', '(\'' + iccid + '\', \'' + msisdn + '\', \'' + imei + '\', \'' + network + '\', \'' + active + '\', \'' + dateadded + '\')');
  res.json('[{"status":1}]');
});

app.post('/api/requests/addrow', function(req, res) {
    var iccid = req.body.iccid;
    var datapackageid = req.body.datapackageid;
    var timestamp = new Date().toISOString();
    var approved = 0;
    var comments = 'request';
	var tableName = 'Requests (iccid,dataPackageId,timestamp,approved,comments)';
	var parameters = '(\'' + iccid + '\',\'' + datapackageid + '\',\'' + timestamp + '\',' + approved + ',\'' + comments + '\')';
	var queryText = 'INSERT INTO ' + tableName + ' VALUES ' + parameters;
    mydb.dBInsert(config, queryText, function (recordset) {
		res.json({ status: recordset });
	});
});

app.post('/api/usage/addrow', function(req, res) {
    var simcarddatapackageid = req.body.simcarddatapackageid;
    var timestamp = new Date().toISOString();
    var sent = req.body.sent;
    var received = req.body.received;
	var tableName = 'Usage (simCardDataPackageId,timestamp,sent,received)';
	var parameters = '(\'' + simcarddatapackageid + '\',\'' + timestamp + '\',\'' + sent + '\',' + received + '\')';
	var queryText = 'INSERT INTO ' + tableName + ' VALUES ' + parameters;
    mydb.dBInsert(config, queryText, function (recordset) {
		res.json({ status: recordset });
	});
});

app.post('/setsimcarddatapackagesnotactive', function (req, res) {
	var dbName 	  = 'SimCardDataPackages',
		param     = 'active=0',  
		condition = 'simCardDataPackageId=' + req.body.simcarddatapackageid;
		
	mydb.dbUpdate(config, dbName, param, condition, function (recordset) {
		res.json({ status: recordset });
	});
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;