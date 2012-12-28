var util = require('./util')
  , CalendarToDo
  , pad = util.pad
  ;

CalendarToDo = module.exports = function(){
  this.uuid = util.uuid();
  this.todo = {
    offset: new Date().getTimezoneOffset()
  };
};

CalendarToDo.prototype.organizer = function(obj) {
  this.todo.organizer = obj;
};

CalendarToDo.prototype.start = function(datetime) {
  var d = new Date(datetime);
  d.setUTCMinutes(d.getUTCMinutes() - this.todo.offset);
  this.todo.starts = util.format(datetime,this.todo.offset);
  this.todo.startDate = new Date(datetime).getTime();
};

CalendarToDo.prototype.end = function(datetime) {
  this.todo.ends = util.format(datetime,this.todo.offset);
  this.todo.endDate = new Date(datetime).getTime();
};

CalendarToDo.prototype.summary = function(summary) {
  this.todo.summary = summary;
};

CalendarToDo.prototype.url = function(url) {
  this.todo.url = url;
};

CalendarToDo.prototype.categories = function(categories) {
  this.todo.categories = categories;
};

CalendarToDo.prototype.classification = function(classification) {
  switch(classification) {
    case 'PUBLIC':
	case 'PRIVATE':
	case 'CONFIDENTIAL':
	  this.todo.classification = classification;
      break;
    default:
	  //classification incorrect error
	  break;
  }
};

CalendarToDo.prototype.toICal = function() {
  var result = []
    , LE = '\r\n'
    ;

  result.push('BEGIN:VTODO', LE);
  result.push('UID:iCalTODO ', this.uuid, LE);
  
  if (this.todo.organizer) {
    result.push('ORGANIZER;CN="', this.todo.organizer.name, '":mailto:', this.todo.organizer.email, LE);
  }
  if (this.todo.starts) {
    result.push('DTSTART;VALUE=DATE:', this.todo.starts, LE);
  }
  if (this.todo.ends) {
    result.push('DTEND;VALUE=DATE:', this.todo.ends, LE);
  }
  if (this.todo.url) {
    result.push('URL;VALUE=URI:', this.todo.url, LE);
  }
  if (this.todo.summary) {
    result.push('SUMMARY:', this.todo.summary, LE);
  }
  if (this.todo.categories) {
    result.push('CATEGORIES:', this.todo.categories, LE);
  }
  if (this.todo.classification) {
    result.push('CLASS:', this.todo.classification, LE);
  }
  
  result.push('END:VTODO', LE);

  return result.join('');
};

CalendarToDo.prototype.toObject = function() {
  return {
    start: this.todo.startDate
  , end: this.todo.endDate
  , summary: this.todo.summary
  , url: this.todo.url
  , organizer: this.todo.organizer
  , categories: this.todo.categories
  , classification: this.todo.classification
  , uuid: this.uuid
  };
};
