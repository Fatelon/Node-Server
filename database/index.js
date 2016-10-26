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
  connection.query('CREATE TABLE IF NOT EXISTS MyDev (deviceId varchar(50) NOT NULL, appDeviceId varchar(10) NULL, description varchar(255) NOT NULL, PRIMARY KEY(deviceId))', 
    function (err, result) {
        if (err) console.log(err);
        else console.log('Table created ' + result);
    }
  );
};





//module.exports = MyDB;