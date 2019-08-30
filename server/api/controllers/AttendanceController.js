const mysql = require('mysql');
getConnection = function () {
  return mysql.createConnection({
    host: 'localhost',
    user: 'ys',
    password: 'ys',
    database: 'TEST'
  });
};

getAllAttendance = function () {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `SELECT student_id, class_name, attended from ATTENDANCE ORDER BY class_name`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

getAttendance = function (classDesc) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `SELECT student_id, class_name, attended from ATTENDANCE WHERE class_name = \'${classDesc}\'`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

createAttendance = function (classDesc, studentId) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `INSERT INTO ATTENDANCE(student_id, class_name) VALUES (${studentId}, \'${classDesc}\')`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

updateAttendance = function (classDesc, studentId, attended) {
  return new Promise(function (resolve, reject) {
    const connection = getConnection();
    connection.connect();
    const query = `UPDATE ATTENDANCE SET attended = ${attended} WHERE student_id = ${studentId} AND class_name = \'${classDesc}\'`;
    connection.query(query, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
    connection.end();
  });
};

exports.getAll = function (req, res) {
  getAllAttendance()
    .then(function (results) {
      console.log(results);
      res.send(results);
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send(err);
    });
};

exports.get = function (req, res) {
  const className = req.params.classDesc;
  getAttendance(className)
    .then(function (results) {
      console.log(results);
      res.send(results);
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send(err);
    });
};

exports.create = function (req, res) {
  const studentId = req.body.studentId;
  const className = req.body.classDesc;
  if (studentId && className) {
    createAttendance(className, studentId)
      .then(function (results) {
        res.status(200).send('Student is assigned to class!');
      })
      .catch(function (err) {
        console.log('Promise rejection error: ' + err);
        res.status(500).send(err);
      });
  } else {
    res.status(500).send('Both student and class name must be specified');
  }
};

exports.update = function (req, res) {
  const className = req.body.classDesc;
  const studentId = req.body.studentId;
  const attended = req.body.attended;
  updateAttendance(className, studentId, attended)
    .then(function (results) {
      res.status(200).send('Attendance taken!');
    })
    .catch(function (err) {
      console.log('Promise rejection error: ' + err);
      res.status(500).send(err);
    });
};