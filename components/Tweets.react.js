/** @jsx React.DOM */

var React = require('react/addons')
var Tweet = require('./Tweet.react.js');
var ListGroup = require('react-bootstrap').ListGroup;
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = Tweets = React.createClass({

  // Render our tweets
  render: function(){

    // Build list items of single tweet components using map
    var content = this.props.tweets.map(function(tweet){
      return (
        <Tweet key={tweet._id} tweet={tweet} />
      )
    });

    // Return ul filled with our mapped tweets
    return (
      <ListGroup>

        <ReactTransitionGroup transitionName="example">
          {content}
        </ReactTransitionGroup>

      </ListGroup>

    )

  }

});


/*




 */

