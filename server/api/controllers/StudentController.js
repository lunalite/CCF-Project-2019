const mysql = require('mysql');
getConnection = function () {
  return mysql.createConnection({
    host: 'localhost',
    user: 'ys',
    password: 'ys',
    database: 'TEST'
  });
};

getStudents = function () {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `SELECT ID, first_name, last_name from STUDENT`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

getStudent = function (studentId) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `SELECT ID, first_name, last_name from STUDENT WHERE ID = ${studentId}`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

createStudent = function (firstName, lastName) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `INSERT INTO STUDENT(first_name, last_name) VALUES (\'${firstName}\', \'${lastName}\')`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

deleteStudent = function (studentId) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `DELETE FROM STUDENT WHERE ID = ${studentId}`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

updateStudent = function (studentId, firstName, lastName) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `UPDATE STUDENT SET first_name = \'${firstName}\', last_name = \'${lastName}\' WHERE ID = ${studentId}`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

exports.getAll = function (req, res) {
  getStudents()
    .then(function (results) {
      console.log(results);
      res.send(results);
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send();
    });
};

exports.get = function (req, res) {
  const studentId = req.params.studentId;
  getStudent(studentId)
    .then(function (results) {
      console.log(results);
      res.send(results[0]);
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send();
    });
};

exports.create = function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  createStudent(firstName, lastName)
    .then(function (results) {
      res.status(200).send('Student is registered!');
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send();
    });
};

exports.delete = function (req, res) {
  const studentId = req.params.studentId;
  deleteStudent(studentId)
    .then(function (results) {
      res.status(200).send('Student is removed!');
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send();
    });
};

exports.update = function (req, res) {
  const studentId = req.params.studentId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  updateStudent(studentId, firstName, lastName)
    .then(function (results) {
      res.status(200).send('Student is updated!');
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send();
    });
};

