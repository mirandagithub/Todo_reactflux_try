/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var AppStore = require('../stores/AppStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
/*
function getTodoState() {
  return {
      allTodos: AppStore.getAll(),
      areAllComplete: AppStore.areAllComplete()
    };
}
*/

var TodoApp = React.createClass({

  getInitialState: function() {
    var todos = {
       '100': {id: '100', complete: true, text: 'Milk'},
       '200': {id: '200', complete: true, text: 'Tea'},
       '300': {id: '300', complete: false, text: 'Cake'}
      };
      

    return (
        {allTodos: todos,
         areAllComplete: false}
      );

  },

  componentDidMount: function() {
 //   AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
 //   AppStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  /*
  _onChange: function() {
    this.setState(getTodoState());
  } 
  */

});

module.exports = TodoApp;
