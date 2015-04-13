
/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var React = require('react');
var AppStore = require('../stores/AppStore');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');


/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
      allTodos: AppStore.getAll(),
      areAllComplete: AppStore.areAllComplete()
    };
}


var TodoApp = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
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
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */

  _onChange: function() {
    this.setState(getTodoState());
  }
});

module.exports = TodoApp;
