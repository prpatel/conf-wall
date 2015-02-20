var fs     = require('fs'),
  _ = require('underscore'),
  moment = require('moment');


function jsonEscape(str)  {
  return str.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "");
}

function esc (key, val) {
  console.log('encountered string')
  if (typeof(val)!="string") return val;

  return jsonEscape(val);
}

var buffer = '';
var file = fs.readFileSync("alldays.json", "utf8");
var alldays = (JSON.parse(jsonEscape(file)));

var days = [];

var currentDay = moment('2015-01-01');
var currentDayNum = 0;
var currentDayIndex = 0;
var unixTime;
_.each(alldays.scheduleItemList.scheduleItems, function(it) {

  var currentSlot = moment(it.fromTime);

  if (moment(currentSlot).isSame(currentDay)) {
    //currentDayIndex++;
  } else {
    currentDay = currentSlot;
    unixTime = currentDay.format('X');
    days[unixTime] = [];
  }
  if (it.scheduleItemType == 'ADMINISTRATIVE' ) {
    days[unixTime].push({
      index : currentDayIndex,
      time : currentSlot.format("LLL"),
      room : it.room.name,
      title : it.title,
      description : it.title
    });

  } else if (it.scheduleItemType == 'BREAK') {
    // don't show breaks

  } else {
    var speakerInfo = _.reduce(it.presentation.speakers, function(memo, s) {
      return memo + s.firstName + ' ' + s.lastName + '\n';
    }, '');
    var speakerDetails = _.reduce(it.presentation.speakers, function(memo, s) {
      return memo + s.firstName + ' ' + s.lastName + '\n' + s.bio + '\n';
    }, '');
    days[unixTime].push({
      index : currentDayIndex,
      time : currentSlot.format("LLL"),
      room : it.room.name,
      title : it.presentation.title,
      speaker : speakerInfo,
      speakerId: it.presentation.speakers[0].id
    });
  }
});

function getScheduleForNextTimeSlot(currentTime) {
  var tenMinsFromNow = currentTime.add(10, 'm');
  console.log(tenMinsFromNow.format("LLL"))

  var nextSlot;
  for(var key in days) {
    var thisSlot = moment.unix(key);
    //console.log(key, thisSlot.format("LLL"));
    if(thisSlot.isAfter(tenMinsFromNow)) {
      nextSlot = thisSlot;
      console.log("The next time slot is:" , nextSlot.format("LLL"))
      return days[key];
      break;
    }
  }
}

console.log(getScheduleForNextTimeSlot(moment('March 11, 2015 10:00 AM')));

// image = "https://devnexus.com/s/speakers/"+talkDetails.speakerId+".jpg";
