/** @jsx React.DOM */

var React = require('react');
var Tweets = require('./Tweets.react.js');
var Loader = require('./Loader.react.js');
var AnnounceBar = require('./AnnounceBar.react.js');
var Schedule = require('./Schedule.react.js');
var Panel = require('react-bootstrap').Panel;
var Jumbotron = require('react-bootstrap').Jumbotron;
var Button = require('react-bootstrap').Button;
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Well = require('react-bootstrap').Well;
// Export the TweetsApp component
module.exports = TweetsApp = React.createClass({

  tweetData: {
    updated: 0,
    count: 0,
    skip: 0,
    newTweetsAvail: false,
    announcement: "Include @devnexus in your Tweets to enter prize drawings!"
  },

  displayNewTweets: function() {
    if (this.tweetData.newTweetsAvail) {
      this.tweetData.newTweetsAvail = false;
      this.setState({tweets: this.tweetData.updated,
        count: this.tweetData.count,
        skip: this.tweetData.skip,
        announcement: this.tweetData.announcement});

    }

  },

  // Method to add a tweet to our timeline
  addTweet: function(tweet){
    // Get current application state
    var updated = this.state.tweets;

    // Increment the unread count
    var count = this.state.count + 1;

    // Increment the skip count
    var skip = this.state.skip + 1;

    // Add tweet to the beginning of the tweets array
    updated.unshift(tweet);
    this.tweetData.updated = updated;
    this.tweetData.count = count;
    this.tweetData.skip = skip;
    this.tweetData.newTweetsAvail = true;
  },

  // Method to get JSON from server by page
  getPage: function(page){

    // Setup our ajax request
    var request = new XMLHttpRequest(), self = this;
    request.open('GET', 'page/' + page + "/" + this.state.skip, true);
    request.onload = function() {

      // If everything is cool...
      if (request.status >= 200 && request.status < 400){

        // Load our next page
        self.loadPagedTweets(JSON.parse(request.responseText));

      } else {

        // Set application state (Not paging, paging complete)
        self.setState({paging: false, done: true});

      }
    };

    // Fire!
    request.send();

  },

  // Method to show the unread tweets
  showNewTweets: function(){

    // Get current application state
    var updated = this.state.tweets;

    // Mark our tweets active
    updated.forEach(function(tweet){
      tweet.active = true;
    });

    // Set application state (active tweets + reset unread count)
    this.setState({tweets: updated, count: 0});

  },

  // Method to check if more tweets should be loaded, by scroll position
  checkWindowScroll: function(){

    // Get scroll pos & window data
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var s = (document.body.scrollTop || document.documentElement.scrollTop || 0);
    var scrolled = (h + s) > document.body.offsetHeight;

    // If scrolled enough, not currently paging and not complete...
    if(scrolled && !this.state.paging && !this.state.done) {

      // Set application state (Paging, Increment page)
      this.setState({paging: true, page: this.state.page + 1});

      // Get the next page of tweets from the server
      this.getPage(this.state.page);

    }
  },

  // Set the initial component state
  getInitialState: function(props){

    props = props || this.props;

    this.tweetData.updated = props.tweets;
    // Set initial application state using props
    return {
      tweets: props.tweets,
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false,
      announcement: "Include @devnexus in your Tweets to enter prize drawings!"
    };

  },

  componentWillReceiveProps: function(newProps, oldProps){
    this.setState(this.getInitialState(newProps));
  },

  // Called directly after component rendering, only on client
  componentDidMount: function(){

    // Preserve self reference
    var self = this;

    // Initialize socket.io
    var socket = io.connect();

    // On tweet event emission...
    socket.on('tweet', function (data) {

        // Add a tweet to our queue
        self.addTweet(data);

    });

    socket.on('announce', function (data) {
      self.tweetData.announcement = data;
     self.tweetData.newTweetsAvail = true;
      self.displayNewTweets();
    });

    setInterval(this.displayNewTweets, 2000);

    // Attach scroll event to the window for infinity paging
    window.addEventListener('scroll', this.checkWindowScroll);

  },

  // Render the component
  render: function(){
    return (

<Grid>
  <Row className="show-grid" >
    <Col xs={12} className = "small-padding-panel">
      <Panel className = "small-padding-panel">
        <img src="DevNexus_logo_large.png" className="center-block main-logo"></img>
      </Panel>
    </Col>
  </Row>

  <Row className="show-grid">
    <Col xs={12} className = "small-padding-panel">
      <AnnounceBar announcement={this.state.announcement}/>
    </Col>
  </Row>

    <Row className="show-grid ">
      <Col xs={4} className ="small-padding-panel">
        <Panel className="tweet-section ">
          <Schedule/>
        </Panel>
      </Col>
      <Col xs={8} className = "small-padding-panel">
      <Panel className="tweet-section">
        <Tweets tweets={this.state.tweets} />
      </Panel>
      </Col>
    </Row>
</Grid>

    )

  }

});
