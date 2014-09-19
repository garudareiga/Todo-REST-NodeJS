'use strict';

/**
 * Utility function to generate a UUID in Javascript shamelessly borrowed from
 * stackoverflow
 */
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports = function module(todos, mongoose) {

  return {
    findAll : function findAll(callback) {
      // load a listing of to-dos from database if todos is empty
      if (todos.length > 0) {
        return callback(null, todos);
      }
      mongoose.model('Todo').find({}, function(err, docs) {
        for (var i = 0; i < docs.length; ++i) {
          todos.push({
            id: docs[i]._id.toString(),
            content: docs[i].content.toString()
          })
        }
        callback(null, todos);
      });
    },

    findOne : function findOne(id, callback) {
      for (var i = 0; i < todos.length; ++i) {
        if (todos[i].id === id) {
          return callback(null, todos[i]);
        }
      }
      callback(new Error('todo with id ' + id + ' not found'));
    },

    addTodo : function addTodo(content, callback) {
      var Todo = mongoose.model('Todo');
      (new Todo({content: content})).save(function (err, product) {
        if (err) {
          callback(new Error(content + ' unsaved'));
        } else {
          var todo = {
            id: product._id.toString(),
            content: product.content.toString()
          }
          todos.push(todo);
          callback(null, todo);
        }
      });
    },

    updateTodo : function updateTodo(id, content, callback) {
      for (var i = 0; i < todos.length; ++i) {
        if (id === todos[i].id) {
          return mongoose.model('Todo').findOne({_id: id}, function(err, doc) {
            if (err) {
              callback(new Error(id + ' unupdated'));
            } else {
              doc.content = content;
              todos[i].content = content;
              return callback();
            }
          });
        }
      }
      callback(new Error('todo with id ' + id + ' not found.'));
    },

    deleteTodo : function deleteTodo(id, callback) {
      for (var i = 0; i < todos.length; ++i) {
        if (id === todos[i].id) {
          return mongoose.model('Todo').findOne({_id: id}).remove(function(err) {
            if (err) {
              return callback(new Error(id + ' undeleted'));
            } else {
              todos.splice(i, 1);
              return callback(null);
            }
          });
        }
      }
      callback(new Error('todo with id ' + id + ' not found.'));
    }
  };
};