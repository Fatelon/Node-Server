var mysql = require('mysql');

//function MyDB() {}



exports.createMyConnection = function createConnection() {
  var connection = mysql.createConnection({
    host     : '127.3.73.2',
    port     : '3306',
    user     : 'adminBpFnnvy',
    password : '9Cj1vZVsSrN_',
    database : 'mynodejsserver'
  });
  
  connection.connect(
    function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('my connected as id ' + connection.threadId);
    }
  );
};





//module.exports = MyDB;