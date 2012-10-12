exports.pad = function pad(n){
  n = parseInt(n);
  return n < 10 ? '0' + n : n
}

exports.uuid = function uuid(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

exports.format = function format(datetime, offset) {
  var d = new Date(datetime);
  d.setUTCMinutes(d.getUTCMinutes() - offset);

  return d.getUTCFullYear()
    + pad(d.getUTCMonth() + 1)
    + pad(d.getUTCDate()) + 'T'
    + pad(d.getUTCHours())
    + pad(d.getUTCMinutes())
    + pad(d.getUTCSeconds());
}
