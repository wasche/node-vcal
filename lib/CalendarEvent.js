var util = require('./util')
  , CalendarEvent
  , pad = util.pad
  ;

CalendarEvent = function(){
  this.uuid = util.uuid();
  this.event = {
    offset: new Date().getTimezoneOffset()
  };
};

CalendarEvent.prototype.format = function(datetime) {
  var d = new Date(datetime);
  d.setUTCMinutes(d.getUTCMinutes() - this.event.offset);

  return d.getUTCFullYear()
    + pad(d.getUTCMonth() + 1)
    + pad(d.getUTCDate()) + 'T'
    + pad(d.getUTCHours())
    + pad(d.getUTCMinutes())
    + pad(d.getUTCSeconds());
};

CalendarEvent.prototype.organizer = function(obj) {
  this.event.organizer = obj;
};

CalendarEvent.prototype.start = function(datetime) {
  var d = new Date(datetime);
  d.setUTCMinutes(d.getUTCMinutes() - this.event.offset);
  this.event.location = tzone.getLocation(d);
  this.event.starts = this.format(datetime);
};

CalendarEvent.prototype.end = function(datetime) {
  this.event.ends = this.format(datetime);
};

CalendarEvent.prototype.summary = function(summary) {
  this.event.summary = summary;
};

CalendarEvent.prototype.url = function(url) {
  this.event.url = url;
};

CalendarEvent.prototype.toICal = function() {
  var result = []
    ;

  result.push('BEGIN:VEVENT', LE);
  result.push('UID:iCalEvent ', this.uuid, LE);
  //result.push('DTSTAMP;TZID=', this.event.location, ':', this.format(new Date()), LE);
  
  if (this.event.organizer) {
    result.push('ORGANIZER;CN="', this.event.organizer.name, '":mailto:', this.event.organizer.email, LE);
  }
  if (this.event.starts) {
    //result.push('DTSTART;TZID=', this.event.location, ':', this.event.starts, LE);
    result.push('DTSTART;VALUE=DATE:', this.event.starts, LE);
  }
  if (this.event.ends) {
    //result.push('DTEND;TZID=', this.event.location, ':', this.event.ends, LE);
    result.push('DTEND;VALUE=DATE:', this.event.ends, LE);
  }
  if (this.event.url) {
    result.push('URL;VALUE=URI:', this.event.url, LE);
  }
  if (this.event.summary) {
    result.push('SUMMARY:', this.event.summary, LE);
  }

  result.push('END:VEVENT', LE);

  return result.join('');
};
