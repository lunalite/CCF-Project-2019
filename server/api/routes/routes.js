'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/CCFController');

  // todoList Routes
  app.route('/students')
    .get(todoList.getSomething)
    .post(todoList.postSomething);

  /*app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);*/
};
