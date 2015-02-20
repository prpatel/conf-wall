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

module.exports = Tweet = React.createClass({

  render: function(){
    var tweet = this.props.tweet;
    var bgColor;
    if (counter % 2) {
      bgColor = "bgColorGreen"
    } else {
      bgColor = "bgColorOrange"
    }

    //bgColor = ""
    counter++;
    return (
      <ListGroupItem className={bgColor}>


        <Grid>
            <Row className="show-grid">
              <Col sm={1}>
                  <img src={tweet.avatar} className="avatar"/>
              </Col>
              <Col sm={6} className = "tweet-text">
                <Row >
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
