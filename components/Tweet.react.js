/** @jsx React.DOM */

var React = require('react');

var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Panel = require('react-bootstrap').Panel;
var Col = require('react-bootstrap').Col;


var counter = 0;

module.exports = Tweet = React.createClass({

  render: function(){
    var tweet = this.props.tweet;
    var bgColor;
    if (counter % 2) {
      bgColor = "success"
    } else {
      bgColor = "info"
    }
    counter++;
    return (
      <ListGroupItem bsStyle={bgColor}>


        <Grid>
            <Row className="show-grid">
              <Col md={1}>
                  <img src={tweet.avatar} className="avatar"/>
              </Col>
              <Col md={3}>
                <Row>
                  @{tweet.screenname}
                </Row>
                <Row>
                  {tweet.body}
                </Row>
              </Col>
            </Row>
        </Grid>
    </ListGroupItem>
    )
  }
});
