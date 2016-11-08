var sql = require('mssql');


var dataBaseInsert = function(config, queryText) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('dataBaseInsert - ' + err);
    }
    var request = new sql.Request(connection1);
    request.query(queryText, function(err, recordset) {
        console.log('dataBaseInsert insert recordset - ' + recordset);
    });
 
  });
}

module.exports.addRowInTable = function(config, tableName, params) {
  var queryText = 'INSERT INTO ' + tableName + ' VALUES ' + params;
  dataBaseInsert(config, queryText);  
}

module.exports.getColumnFromTable = function(config, tableName, columnName) {
  var queryText = 'SELECT ' + columName + ' FROM ' + tableName;
  dataBaseInsert(config, queryText);  
}

module.exports.testF = function(config, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('DB SELECT - ' + err);
    }
    var request = new sql.Request(connection1);
    request.query('SELECT sizeBytes  FROM DataPackage ', function(err, recordset) {
        console.log('DB SELECT recordset - %j', recordset);
		callback(recordset);
    });
	
  });
}