/** @jsx React.DOM */

var React = require('react');

var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Panel = require('react-bootstrap').Panel;
var Col = require('react-bootstrap').Col;
var Jumbotron = require('react-bootstrap').Jumbotron;
var Input = require('react-bootstrap').Input;

var counter = 0;

module.exports = AnnounceForm = React.createClass({

  getInitialState: function(props){

    props = props || this.props;

    // Set initial application state using props
    return {
      announcement: props.announcement,
    };

  },

  // overkill to AJAX it
  handleSubmit: function(e) {
    e.preventDefault();
    var announcement = this.refs.announcement.getDOMNode().value.trim();

    if (!announcement ) {
      return;
    }
    // TODO: send request to the server
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
  },

  render: function(){
    return (
      <Jumbotron>
        <h1>Send Announcement</h1>
        <p>This is send in real time, so be careful!</p>
        <form method="post">
          <Input type="text" label='Text' defaultValue={this.state.announcement} ref="announcement" name="announcement"/>
          <Input type="submit" value="POST" />
        </form>

      </Jumbotron>
    )
  }
});
