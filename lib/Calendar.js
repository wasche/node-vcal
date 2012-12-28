
var Calendar = module.exports = function(){
  this.version = '2.0';
  this.id = '-//kurakin//vCal.js v0.1//EN';
  this.events = [];
  this.toDos = [];
};

Calendar.prototype.addEvent = function(event){
  this.events.push(event);
};

Calendar.prototype.addToDo = function(toDo){
  this.toDos.push(toDo);
}

Calendar.prototype.toFile = function(){
  var result = []
    , LE = '\r\n'
    ;

  result.push('BEGIN:VCALENDAR', LE);
  result.push('VERSION:', this.version, LE);
  result.push('PRODID:', this.id, LE);
  result.push('CALSCALE:GREGORIAN', LE);

  this.events.forEach(function(evnt){
    result.push(evnt.toICal());
  });
  
  this.toDos.forEach(function(toDo){
    result.push(toDo.toICal());
  });

  result.push('END:VCALENDAR', LE);
  
  return result.join('');
};

Calendar.prototype.toObject = function(){
  var result = {
    version: this.version
  , events: []
  , toDos: []
  };

  this.events.forEach(function(evnt){
    result.events.push(evnt.toObject());
  });
  
  this.toDos.forEach(function(toDo){
    result.push(toDo.toObject());
  });

  return result;
};
