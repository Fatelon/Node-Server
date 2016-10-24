//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
//	session = require('express-session'),
    app     = express(),
    eps     = require('ejs'),
    morgan  = require('morgan');
    
//app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));
	
Object.assign=require('object-assign');

// create a write stream (in append mode) 
var accessLogStream = fs.createWriteStream(__dirname + '/public/access.log', {flags: 'a'});

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined', {stream: accessLogStream}));

app.use('/static', express.static(__dirname + '/public'));


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.get('/', function (req, res) {
  res.render('index.html', { pageCountMessage : null});
});

app.get('/log', function (req, res) {
  res.send('hello log');
});

//app.get('/login', function(req, res){
//  var html = '<form action="/" method="post">' +
//             'Your name: <input type="text" name="userName"><br>' +
//             '<button type="submit">Submit</button>' +
//             '</form>';
//  if (req.session.userName) {
//    html += '<br>Your username from your session is: ' + req.session.userName;
//  }
//  res.send(html);
//});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;