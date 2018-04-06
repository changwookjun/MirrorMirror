(function(annyang) {
  'use strict';

  /** icals 연동된 구글 캘린더의 정보를 가져온다. */
  function CalendarService($window, $http, $q) {
    var service = {};

    service.events = [];

    service.getCalendarEvents = function() {
      service.events = [];
      return loadFile(config.calendar.icals);
    }

    var loadFile = function(urls) {
      var promises = [];

      angular.forEach(urls, function(url) {
        promises.push($http.get(url));
      });

      return $q.all(promises).then(function(data) {
        for (var i = 0; i < promises.length; i++) {
          parseICAL(data[i].data);
        }
      });
    }

    var makeDate = function(type, ical_date) {
        if(ical_date.endsWith('Z')){
            return moment(ical_date, 'YYYYMMDDTHHmmssZ');
        }

        if(!type.endsWith('VALUE=DATE')){
            return moment(ical_date, 'YYYYMMDDTHHmmss');
        } else {
            return moment(ical_date, 'YYYYMMDD');
        }
    }

    var parseICAL = function(data) {
      //Ensure cal is empty
      var events = [];

      //Clean string and split the file so we can handle it (line by line)
      var cal_array = data.replace(new RegExp("\\r", "g"), "").replace(/\n /g, "").split("\n");

      //Keep track of when we are activly parsing an event
      var in_event = false;
      //Use as a holder for the current event being proccessed.
      var cur_event = null;
      for (var i = 0; i < cal_array.length; i++) {
        var ln = cal_array[i];
        //If we encounted a new Event, create a blank event object + set in event options.
        if (!in_event && ln == 'BEGIN:VEVENT') {
          var in_event = true;
          var cur_event = {};
        }
        //If we encounter end event, complete the object and add it to our events array then clear it for reuse.
        if (in_event && ln == 'END:VEVENT') {
          in_event = false;
          if(!contains(events, cur_event)) {
            events.push(cur_event);
          }
          cur_event = null;
        }
        //If we are in an event
        else if (in_event) {
          //var lntrim = ln.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          //var lnsplit = lntrim.split(':');
          //type = lnsplit[0];
          //val = lnsplit[1];

          //Split the item based on the first ":"
          var idx = ln.indexOf(':');
          //Apply trimming to values to reduce risks of badly formatted ical files.
          var type = ln.substr(0, idx).replace(/^\s\s*/, '').replace(/\s\s*$/, ''); //Trim
          var val = ln.substr(idx + 1).replace(/^\s\s*/, '').replace(/\s\s*$/, '');

          //If the type is a start date, proccess it and store details
          if (type.startsWith('DTSTART')) {
            cur_event.start = makeDate(type, val);
          }

          //If the type is an end date, do the same as above
          else if (type.startsWith('DTEND')) {
            cur_event.end = makeDate(type, val);
          }
          //Convert timestamp
          else if (type == 'DTSTAMP') {
            //val = makeDate(type, val);
          } else {
            val = val
              .replace(/\\r\\n/g, '<br />')
              .replace(/\\n/g, '<br />')
              .replace(/\\,/g, ',');
          }

          //Add the value to our event object.
          cur_event[type] = val;
          if (cur_event['SUMMARY'] !== undefined && cur_event['RRULE'] !== undefined) {
            var options = new RRule.parseString(cur_event['RRULE']);
      			options.dtstart = cur_event.start.toDate();
      			var rule = new RRule(options);
            var oneYear = new Date();
      			oneYear.setFullYear(oneYear.getFullYear() + 1);
      			var dates = rule.between(new Date(), oneYear, true, function (date, i){return i < 10});
      			for (var date in dates) {
              var recuring_event = {};
              recuring_event.SUMMARY = cur_event.SUMMARY;
      				var dt = new Date(dates[date]);
      				var startDate = moment(dt);
              recuring_event.start = startDate;
              recuring_event.end = startDate;
              if(!contains(events, recuring_event)) {
                events.push(recuring_event);
              }
      			}
          }
        }
      }
      //Add all of the extracted events to the CalendarService
      service.events.push.apply(service.events, events);
    }

    var contains = function(input, obj) {
      var i = input.length;
      while (i--) {
        var current = input[i];
        if (obj.start.isValid()) {
          if (current.start.isSame(obj.start.toDate()) && current.SUMMARY === obj.SUMMARY) {
            return true;
          }
        }
      }
      return false;
    }

    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

    service.getEvents = function(events) {
      return service.events;
    }

    service.getFutureEvents = function() {
      var future_events = [],
        current_date = new moment(),
        end_date = new moment().add(config.calendar.maxDays, 'days');

      service.events.forEach(function(itm) {
        //If the event started before current time but ends after the current time or
        // if there is no end time and the event starts between today and the max number of days add it.
        if ((itm.end != undefined && (itm.end.isAfter(current_date) && itm.start.isBefore(current_date))) || itm.start.isBetween(current_date, end_date)){
            future_events.push(itm);
        }
      });
      future_events = sortAscending(future_events);
      return future_events.slice(0, config.calendar.maxResults);
    }

    var sortAscending = function(events) {
      return events.sort(function(a, b) {
        var key1 = a.start;
        var key2 = b.start;

        if (key1.isBefore(key2)) {
          return -1;
        } else if (key1.isSame(key2)) {
          return 0;
        } else {
          return 1;
        }
      });
    }

    service.getPastEvents = function(events) {
      var past_events = [],
        current_date = new moment();

      service.events.forEach(function(itm) {
        //If the event ended before the current time, add it to the array to return.
        if (itm.end != undefined && itm.end.isBefore(current_date)){
            past_events.push(itm);
        }
      });
      return past_events.reverse();
    }

    return service;
  }

  angular.module('SmartMirror')
    .factory('CalendarService', CalendarService);
}(window.annyang));
