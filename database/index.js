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
    request.query('SELECT * FROM DataPackages', function(err, recordset) {
        console.log('DB SELECT recordset - %j', recordset);
		callback(recordset);
    });
	
  });
}

module.exports.getRequests = function(config, iccid, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('DB SELECT - ' + err);
    }
    var request = new sql.Request(connection1);
    request.query('SELECT * FROM Requests WHERE iccid = \'' + iccid + '\' AND approved = \'1\'', function(err, recordset) {
        console.log('DB SELECT recordset - %j', recordset);
		callback(recordset);
    });
	
  });
}

module.exports.getSimCardDataPackages = function(config, requestId, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('DB SELECT - ' + err);
    }
    var request = new sql.Request(connection1);
    request.query('SELECT * FROM SimCardDataPackages WHERE requestId = \'' + requestId + '\'', function(err, recordset) {
        console.log('DB SELECT recordset - %j', recordset);
		callback(recordset);
    });
	
  });
}

module.exports.dBInsert = function(config, queryText, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('dataBaseInsert - ' + err);
	  callback('0');
    }
    var request = new sql.Request(connection1);
    request.query(queryText, function(err, recordset) {
		callback('1');
	});
  });
}

module.exports.dbUpdate = function(config, dbName, param,  condition, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('DB UPADATE - ' + err);
	  callback('0');
    }
    var request = new sql.Request(connection1);
    request.query('UPDATE ' + dbName + ' SET ' + param + ' WHERE ' + condition, function(err, recordset) {
        console.log('DB UPADATE recordset - %j', recordset);
		callback('1');
    });
	
  });
}

module.exports.getSimCard = function(config, iccid, callback) {
  var connection1 = new sql.Connection(config, function(err) {
    if (err != null) {
      console.log('DB SELECT - ' + err);
    }
    var request = new sql.Request(connection1);
    request.query('SELECT * FROM SimCards WHERE iccid = \'' + iccid + '\'', function(err, recordset) {
        console.log('DB SELECT recordset - %j', recordset);
		callback(recordset);
    });
	
  });
}