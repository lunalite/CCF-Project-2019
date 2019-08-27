getStudent = function () {
  return new Promise(function (resolve, reject) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'ys',
      password: 'ys',
      database: 'TEST'
    });

    connection.connect();

    connection.query('SELECT first_name, last_name from STUDENT ', function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    }).finally(function () {
      connection.end();
    });
  });
};

exports.getSomething = function (req, res) {
  getStudent()
    .then(function (results) {
      console.log(results);
      res.send(results);
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
    });
};

exports.postSomething = function (req, res) {
  res.send('hello');
};
