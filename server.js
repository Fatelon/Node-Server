//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express(),
    eps     = require('ejs'),
	mysql   = require('mysql'),
	winston = require('winston');
//    morgan  = require('morgan');
	
	
Object.assign=require('object-assign');

// create a write stream (in append mode) 
var accessLogStream = fs.createWriteStream(__dirname + '/public/access.log', {flags: 'a'});

app.engine('html', require('ejs').renderFile);
//app.use(morgan('combined', {stream: accessLogStream}));

app.use('/static', express.static(__dirname + '/public'));


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

	
//winston.add(winston.transports.File, { filename: __dirname + '/public/winston.log' });	
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: __dirname + '/public/winston.log' })
    ]
  });
	
	
var connection = mysql.createConnection({
  host     : 'mynodejsserver-fatelon.rhcloud.com',
  user     : 'adminBpFnnvy',
  password : '9Cj1vZVsSrN_',
  database : 'mynodejsserver'
});
	
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  logger.info('connected as id ' + connection.threadId);
  logger.log('debug', 'lalalalala');
  console.log('connected as id ' + connection.threadId);
});	
	
	
	
app.get('/', function (req, res) {
  logger.transports[1].log('info', 'get / request');
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