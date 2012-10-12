var util = require('./util')
  , CalendarEvent
  , pad = util.pad
  ;

CalendarEvent = module.exports = function(){
  this.uuid = util.uuid();
  this.event = {
    offset: new Date().getTimezoneOffset()
  };
};

CalendarEvent.prototype.organizer = function(obj) {
  this.event.organizer = obj;
};

CalendarEvent.prototype.start = function(datetime) {
  var d = new Date(datetime);
  d.setUTCMinutes(d.getUTCMinutes() - this.event.offset);
  this.event.starts = util.format(datetime,this.event.offset);
  this.event.startDate = new Date(datetime).getTime();
};

CalendarEvent.prototype.end = function(datetime) {
  this.event.ends = util.format(datetime,this.event.offset);
  this.event.endDate = new Date(datetime).getTime();
};

CalendarEvent.prototype.summary = function(summary) {
  this.event.summary = summary;
};

CalendarEvent.prototype.url = function(url) {
  this.event.url = url;
};

CalendarEvent.prototype.categories = function(categories) {
  this.event.categories = categories;
};

CalendarEvent.prototype.classification = function(classification) {
  switch(classification) {
    case 'PUBLIC':
	case 'PRIVATE':
	case 'CONFIDENTIAL':
	  this.event.classification = classification;
      break;
    default:
	  //classification incorrect error
	  break;
  }
};

CalendarEvent.prototype.toICal = function() {
  var result = []
    , LE = '\r\n'
    ;

  result.push('BEGIN:VEVENT', LE);
  result.push('UID:iCalEvent ', this.uuid, LE);
  
  if (this.event.organizer) {
    result.push('ORGANIZER;CN="', this.event.organizer.name, '":mailto:', this.event.organizer.email, LE);
  }
  if (this.event.starts) {
    result.push('DTSTART;VALUE=DATE:', this.event.starts, LE);
  }
  if (this.event.ends) {
    result.push('DTEND;VALUE=DATE:', this.event.ends, LE);
  }
  if (this.event.url) {
    result.push('URL;VALUE=URI:', this.event.url, LE);
  }
  if (this.event.summary) {
    result.push('SUMMARY:', this.event.summary, LE);
  }
  if (this.event.categories) {
    result.push('CATEGORIES:', this.event.categories, LE);
  }
  if (this.event.classification) {
    result.push('CLASS:', this.event.classification, LE);
  }

  result.push('END:VEVENT', LE);

  return result.join('');
};

CalendarEvent.prototype.toObject = function() {
  return {
    start: this.event.startDate
  , end: this.event.endDate
  , summary: this.event.summary
  , url: this.event.url
  , organizer: this.event.organizer
  , categories: this.event.categories
  , classification: this.event.classification
  , uuid: this.uuid
  };
};
