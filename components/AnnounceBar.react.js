/** @jsx React.DOM */

var React = require('react');
var Panel = require('react-bootstrap').Panel;

module.exports = AnnounceBar = React.createClass({

  // Called directly after component rendering, only on client
  componentDidMount: function(){

    //socket.on('announce', function (data) {
    //  this.setState({announcement: data});
    //});

  },

  render: function(){
    var announcement = this.props.announcement;

    return (

    <Panel bsSize="small" className="text-center small-padding-panel">
      <span className = "announce-font small-padding-panel" >{announcement}</span>
    </Panel>

    )
  }
});
