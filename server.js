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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.engine('html', eps.renderFile);
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
  res.status(200).send('');
//  res.send('{"status": [{"st": "ok"]}}');
});

app.post('/api/addmydev', function(req, res) {
    var id = req.body.id;
    var value = req.body.value;
    mydb.addRowInTable(config, 'MyDev', '(' + id + ', ' + value + ')');
    res.json(req.body);
//    res.send(id + ' ' + value);
});

app.post('/api/devices/addrow', function(req, res) {
    var device_id = req.body.device_id;
    var app_device_id = req.body.app_device_id;
    var description = req.body.description;
    mydb.addRowInTable(config, 'Devices', '(' + device_id + ', ' + app_device_id + ', ' + description + ')');
    res.json(req.body);
});

app.post('/api/DeviceSimCards/addrow', function(req, res) {
    var deviceId = req.body.deviceid;
    var iccid = req.body.iccid;
    mydb.addRowInTable(config, 'DeviceSimCards', '(' + deviceId + ', ' + iccid + ')');
    res.json(req.body);
});

app.post('/api/SimCards/addrow', function(req, res) {
    var iccid = req.body.iccid;
    var msisdn = req.body.msisdn;
    var imei = req.body.imei;
    var network = req.body.network;
    var active = req.body.active;
    var dateAdded = req.body.dateAdded;
    mydb.addRowInTable(config, 'SimCards', '(' + iccid + ', ' + msisdn + ', ' + imei + ', ' + network + ', ' + active + ', ' + dateAdded + ')');
    res.json(req.body);
});

app.post('/api/SMS/addrow', function(req, res) {
    var smsId = req.body.smsId;
    var iccid = req.body.iccid;
    var message = req.body.message;
    var fromNumber = req.body.fromNumber;
    var timestamp = req.body.timestamp;
    mydb.addRowInTable(config, 'SMS', '(' + smsId + ', ' + iccid + ', ' + message + ', ' + fromNumber + ', ' + timestamp + ')');
    res.json(req.body);
});

app.post('/api/SimCardDataPackages/addrow', function(req, res) {
    var simCardDataPackageId = req.body.simCardDataPackageId;
    var dateFrom = req.body.dateFrom;
    var dateTo = req.body.dateTo;
    var active = req.body.active;
    var requestId = req.body.requestId;
    mydb.addRowInTable(config, 'SMS', '(' + simCardDataPackageId + ', ' + dateFrom + ', ' + dateTo + ', ' + active + ', ' + requestId + ')');
    res.json(req.body);
});

app.post('/api/Usage/addrow', function(req, res) {
    var usageId = req.body.usageId;
    var simCardDataPackageId = req.body.simCardDataPackageId;
    var timestamp = req.body.timestamp;
    var sent = req.body.sent;
    var received = req.body.received;
    var total = req.body.total;
    mydb.addRowInTable(config, 'Usage', '(' + usageId + ', ' + simCardDataPackageId + ', ' + timestamp + ', ' + sent + ', ' + received + ', ' + total + ')');
    res.json(req.body);
});

app.post('/api/Requests/addrow', function(req, res) {
    var requestId = req.body.requestId;
    var iccid = req.body.iccid;
    var dataPackageId = req.body.dataPackageId;
    var timestamp = req.body.timestamp;
    var approved = req.body.approved;
    var comments = req.body.comments;
    mydb.addRowInTable(config, 'Requests', '(' + requestId + ', ' + iccid + ', ' + dataPackageId + ', ' + timestamp + ', ' + approved + ', ' + comments + ')');
    res.json(req.body);
});

app.post('/api/DataPackages/addrow', function(req, res) {
    var dataPackageId = req.body.dataPackageId;
    var description = req.body.description;
    var sizeBytes = req.body.sizeBytes;
    mydb.addRowInTable(config, 'DataPackages', '(' + dataPackageId + ', ' + description + ', ' + sizeBytes + ')');
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