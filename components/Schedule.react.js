/** @jsx React.DOM */

var React = require('react/addons');
var Tweet = require('./Tweet.react.js');
var ListGroup = require('react-bootstrap').ListGroup;
var ReactTransitionGroup = React.addons.CSSTransitionGroup;
var ScheduleItem = require('./ScheduleItem.react.js');
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var $ = require('jquery');
var moment = require('moment');
var _ = require('underscore');

module.exports = Schedule = React.createClass({

  getInitialState: function() {
    return {schedule: []};
  },
  componentDidMount: function () {
    this.scheduleParser();

  //  setInterval(this.scheduleParser, 300000);
  },

  scheduleParser: function () {

    console.log('Schedule scheduleParser');
    $.ajax({
      url: "http://connect-js.com/scheduleWall.json",
      dataType: 'jsonp',
      success: function(data) {
        parseDataAndSetState(data, this);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });


    function parseDataAndSetState(data, componentContext) {
      console.log('getting schedule data');
      var alldays = data;
      var days = [];
      var currentDay = moment('2015-01-01');
      var currentDayNum = 0;
      var currentDayIndex = 0;
      var unixTime;

      function getScheduleForNextTimeSlot(days, currentTime) {
        var tenMinsFromNow = currentTime.add(10, 'm');
        var nextSlot;
        for (var key in days) {
          var thisSlot = moment(key);
          console.log(key, thisSlot.format("LLL"));
          if (thisSlot.isAfter(tenMinsFromNow)) {
            nextSlot = thisSlot;
            console.log("The next time slot is:", nextSlot.format("LLL"));
            return days[key];
          }
        }
      }

      // var scheduleData = getScheduleForNextTimeSlot(moment('March 11, 2015 2:45 PM'));
      var scheduleData = getScheduleForNextTimeSlot(moment());
      componentContext.setState({schedule: scheduleData});
    }
  },

  // Render our tweets
  render: function () {
    //console.log('about to render', this.state.schedule)
    // Build list items of single tweet components using map
    var content = this.state.schedule.map(function (item) {
      return (
        <ScheduleItem key={item.title} item={item} />
      )
    });

    if (_.first(this.state.schedule)) {
      var timeSlotString =   _.first(this.state.schedule);
      var timeSlotString = timeSlotString.time;
    } else {
      var timeSlotString =  " ...."
    }


    // Return ul filled with our mapped tweets
    return (
      <ListGroup>

        <ListGroupItem className="schedule-text small-padding-panel text-center orange-color">
        <span className="time ">Up next on {timeSlotString}</span>
        </ListGroupItem>

        <ReactTransitionGroup transitionName="example">
          {content}
        </ReactTransitionGroup>

      </ListGroup>

    )

  }

});
