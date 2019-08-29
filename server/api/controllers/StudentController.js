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
    const query = `SELECT ID, name from STUDENT`;
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
    const query = `SELECT ID, name from STUDENT WHERE ID = ${studentId}`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

createStudent = function (name) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `INSERT INTO STUDENT(name) VALUES (\'${name}\')`;
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

updateStudent = function (studentId, name) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `UPDATE STUDENT SET name = \'${name}\' WHERE ID = ${studentId}`;
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
  const name = req.body.name;
  createStudent(name)
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
  const name = req.body.name;
  updateStudent(studentId, name)
    .then(function (results) {
      res.status(200).send('Student is updated!');
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send();
    });
};

