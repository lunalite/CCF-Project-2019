'use strict';
module.exports = function (app) {
  const students = require('../controllers/StudentController');
  const attendance = require('../controllers/AttendanceController');

  app.route('/students')
    .get(students.getAll)
    .post(students.create);

  app.route('/students/:studentId')
    .get(students.get)
    .put(students.update)
    .delete(students.delete);

  app.route('/attendance')
    .get(attendance.getAll)
    // TODO: BULK UPDATE MAY NOT BE EASY
    .put(attendance.update) // Take attendance
    .post(attendance.create); // Register student to a class

  // TODO: RE-THINK ABOUT CASES WITH SPACES
  app.route('/attendance/:classDesc')
    .get(attendance.get);
};
