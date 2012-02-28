
var LE = '\r\n'
  , Calendar
  ;

Calendar = function(){
  this.version = '2.0';
  this.id = '-//kurakin//vCal.js v0.1//EN';
  this.events = [];
};

Calendar.prototype.add = function(evnt){
  this.events.push(evnt);
};

Calendar.prototype.toFile = function(){
  var result = []
    ;

  result.push('BEGIN:VCALENDAR', LE);
  result.push('VERSION:', this.version, LE);
  result.push('PRODID:', this.id, LE);
  result.push('CALSCALE:GREGORIAN', LE);

  this.events.forEach(function(evnt){
    result.push(evnt.toICal());
  });

  result.push('END:VCALENDAR', LE);
  
  return result.join('');
};
