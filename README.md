# node-vcal

## About

Create and parse ics files.

## Install

	npm install vcal

## Example

```
var vcal = require('vcal')
  , cal
  , e
  ;

cal = new vcal.Calendar();

e = new vcal.Event();
e.summary('event description');
e.start(new Date(2011, 11, 31, 17, 0));
e.end(new Date(2012, 0, 1, 2, 0));
e.organizer('that cool guy');
cal.add(e);

console.log(cal.toFile());
```
