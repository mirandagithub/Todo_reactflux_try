/**
   var todos = {
       '100': {id: '100', complete: true, text: 'Milk'},
       '200': {id: '200', complete: true, text: 'Tea'},
       '300': {id: '300', complete: false, text: 'Cake'}
      };
*/



var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};


/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {

 // _todos[id] = assign({}, _todos[id], updates);
  var x = Object.keys(updates);
  _todos[id][x] = updates[x];
  console.log(_todos[id]);
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}


var AppStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },
  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
  AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AppConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        AppStore.emitChange();
      }
      break;

    case AppConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      AppStore.emitChange();
      break;

    case AppConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      AppStore.emitChange();
      break;

    case AppConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        AppStore.emitChange();
      }
      break;

    case AppConstants.TODO_DESTROY:
      destroy(action.id);
      AppStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AppStore;