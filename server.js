// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  http = require('http'),
  mongoose = require('mongoose'),
  twitter = require('ntwitter'),
  routes = require('./routes'),
  config = require('./config'),
  streamHandler = require('./utils/streamHandler');
  Tweet = require('./models/Tweet');
  var random = require("random-js")(); // uses the nativeMath engine
  var io;

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
//mongoose.connect('mongodb://localhost/react-tweets');


var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/react-tweets';
// Connect to our mongo database
mongoose.connect(uristring);

// Create a new ntwitter instance
var twit = new twitter(config.twitter);

// Index Route
app.get('/', routes.index);

// Page Route
app.get('/page/:page/:skip', routes.page);


app.get('/announcement', routes.announcement);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
io = require('socket.io').listen(server);
app.post('/announcement', routes.sendAnnouncement(io));
// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: 'javascript'}, function(stream){
  streamHandler(stream,io);
});

//setInterval(function() {
//  var value = random.integer(1, 100000000000);
//
//    io.emit('tweet',  {
//      _id: value,
//      active: true,
//      author: 'test_user',
//      avatar: 'https://pbs.twimg.com/profile_images/531806988846370816/GEPB7aLh_bigger.png',
//      body: 'test body',
//      date: new Date(),
//      screenname: 'test user'
//    });
//
//
//}, 1000)
