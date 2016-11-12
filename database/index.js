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
  console.log(queryText);
  dataBaseInsert(config, queryText);  
}

module.exports.getColumnFromTable = function(config, tableName, columnName) {
  var queryText = 'SELECT ' + columName + ' FROM ' + tableName;
  dataBaseInsert(config, queryText);  
}

module.exports.selectDataPackages = function(config, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('DB SELECT - ' + err);
    }
    var request = new sql.Request(connection1);
    request.query('SELECT dataPackageId,description,sizeBytes FROM DataPackages', function(err, recordset) {
        console.log('DB SELECT recordset - %j', recordset);
		callback(recordset);
    });
	
  });
}

module.exports.getSimCardDataPackages = function(config, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('DB SELECT - ' + err);
    }
    var request = new sql.Request(connection1);
    request.query('SELECT simCardDataPackageId,dateFrom,dateTo,active,requestId FROM SimCardDataPackages', function(err, recordset) {
        console.log('DB SELECT recordset - %j', recordset);
		callback(recordset);
    });
	
  });
}

module.exports.dBInsert = function(config, queryText, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('dataBaseInsert - ' + err);
    }
    var request = new sql.Request(connection1);
    callback(request.query(queryText, function(err, recordset) {}));
  });
}