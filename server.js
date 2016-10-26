//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    eps     = require('ejs'),
	mysql   = require('mysql');
	
	
Object.assign=require('object-assign');

// create a write stream (in append mode) 
//var accessLogStream = fs.createWriteStream(__dirname + '/public/access.log', {flags: 'a'});

app.engine('html', require('ejs').renderFile);
//app.use(morgan('combined', {stream: accessLogStream}));

app.use('/static', express.static(__dirname + '/public'));


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

	
//winston.add(winston.transports.File, { filename: __dirname + '/public/winston.log' });	
	
	
var connection = mysql.createConnection({
  host     : '127.3.73.2',
  port     : '3306',
  user     : 'adminBpFnnvy',
  password : '9Cj1vZVsSrN_',
  database : 'mynodejsserver'
});

        
	
//connection.connect('CREATE TABLE IF NOT EXISTS Devices (deviceId varchar(50) NOT NULL, appDeviceId varchar(10) NULL, description varchar(255) NOT NULL, PRIMARY KEY(deviceId))',
connection.connect(
  function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  }
);	

connection.query('CREATE TABLE IF NOT EXISTS Dev (deviceId varchar(50) NOT NULL, appDeviceId varchar(10) NULL, description varchar(255) NOT NULL, PRIMARY KEY(deviceId))', function (err, result) {
                        if (err) console.log(err);
                        else console.log('Table created ' + result);
                    });
	
	
app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : null});
});

app.get('/log', function (req, res) {
  res.send('hello log');
});


// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;