var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  AnnounceForm = require('./components/AnnounceForm.react'),

  Tweet = require('./models/Tweet');

module.exports = {

  index: function(req, res) {
    // Call static model method to get tweets in the db
    Tweet.getTweets(0,0, function(tweets, pages) {

      // Render React to a string, passing in our fetched tweets
      var MyComponent = React.createFactory(TweetsApp);
      var markup = React.renderToString(
        MyComponent({
          tweets: tweets
        })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  },

  page: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {

      // Render as JSON
      res.send(tweets);

    });
  },

  announcement: function(req, res) {
    // Render React to a string, passing in our fetched tweets
    var MyComponent = React.createFactory(AnnounceForm);
    var markup = React.renderToString(
      MyComponent()
    );

    // Render our 'home' template
    res.render('home', {
      markup: markup
    });
  },

  sendAnnouncement: function(io) {
    return function (req, res) {
      var announcement = req.body.announcement;

      // Render React to a string, passing in our fetched tweets
      var MyComponent = React.createFactory(AnnounceForm);
      var markup = React.renderToString(
        MyComponent({announcement: announcement})
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup
      });
      console.log('sending announcement:' + announcement);
      io.emit('announce', {
        announcement: announcement
      });
    }
  }

}
