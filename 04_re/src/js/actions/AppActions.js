/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    if (todo.complete) {
      AppDispatcher.dispatch({
        actionType: AppConstants.TODO_UNDO_COMPLETE,
        id: id
      });
    } else {
      AppDispatcher.dispatch({
        actionType: AppConstants.TODO_COMPLETE,
        id: id
      });
    }
  }



};

module.exports = AppActions;
