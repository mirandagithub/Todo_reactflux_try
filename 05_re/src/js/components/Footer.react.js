/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppActions = require('../actions/AppActions');

var Footer = React.createClass({

  propTypes: {
    anyTodos: ReactPropTypes.bool.isRequired,
    numTodos: ReactPropTypes.number.isRequired,
    numComplete: ReactPropTypes.number.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {

    if (!this.props.anyTodos) {
      return null;
    }

    var itemsLeft = this.props.numTodos - this.props.numComplete;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var anyComplete = this.props.numComplete === 0 ? false : true;
    var clearCompletedButton;
    if (anyComplete) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({this.props.numComplete})
        </button>;
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    AppActions.destroyCompleted();
  }

});

module.exports = Footer;
