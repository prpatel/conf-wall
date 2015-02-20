/** @jsx React.DOM */

var React = require('react');

var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Panel = require('react-bootstrap').Panel;
var Col = require('react-bootstrap').Col;
var Label = require('react-bootstrap').Label;
var Well = require('react-bootstrap').Well;

var counter = 0;

module.exports = ScheduleItem = React.createClass({

  render: function(){
    var item = this.props.item;
    var bgColor;
    if (counter % 2) {
      bgColor = "success"
    } else {
      bgColor = "info"
    }

    if (item.speakerId) {
      var speakerPhoto = "https://devnexus.com/s/speakers/"+item.speakerId+".jpg";
    } else {
      var speakerPhoto = "https://pbs.twimg.com/profile_images/535917019174936576/pr4jJjbX_400x400.png";
    }




    //bgColor = ""
    counter++;
    return (
      <ListGroupItem className="schedule-text small-padding-panel">

        <span className="schedule-room">{item.room}:</span> {item.title}



    </ListGroupItem>
    )
  }
});

/*
 <Grid>
 <Row className="show-grid">
 <Col sm={1}>
 <img src={speakerPhoto} className="avatar"/>
 </Col>
 <Col sm={6} className = "tweet-text">
 <Row >
 <strong>{item.title}</strong>
 </Row>
 <Row>
 {item.room}

 </Row>
 </Col>
 </Row>
 </Grid>
 */
