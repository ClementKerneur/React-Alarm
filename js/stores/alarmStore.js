var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var Dispatcher = require('../dispatcher.js');

var mixinRequest = require( '../mixins/request.js' );
var mixinSound = require( '../mixins/sound.js' );

var alarmsStore = _.assign({
   alarms: [{
    name: 'sdfasd',
    hour: 10,
    minutes: 10,
    days: []
   }]
  }, EventEmitter.prototype);


var addAlarmRing = function(hour, minutes, soundId) {
  now = new Date;
  alarmTime = new Date;
  alarmTime.setHours(Number(hour), Number(minutes), 0);
  
  if( alarmTime > now ) {
    whenDring = alarmTime.getTime() - now.getTime();

    return setTimeout( ( function() {
      mixinSound.playMusicById(soundId).play();
    }), whenDring);
  }
  return false;
}

Dispatcher.register(function (action) {
  switch (action.actionType) {

    case 'ADD_ALARM':

      mixinRequest.xhr('post', 'alarms', action.alarm, (function (result) {

        result.timer = addAlarmRing(result.hour, result.minutes, result.music);

        alarmsStore.alarms.push(result);
        alarmsStore.emit('CHANGE');

      }).bind(this));

      break;

    case 'EDIT_ALARM':

      mixinRequest.xhr('PATCH', 'alarms/'+action.alarm.id, action.alarm, (function (result) {

        clearTimeout(alarmsStore.alarms[result.id].timer);
        result.alarm.timer = addAlarmRing(result.alarm.hour, result.alarm.minutes, result.alarm.music);

        alarmsStore.alarms[result.id] = result.alarm;
        alarmsStore.emit('CHANGE');

      }));

      break;

    case 'DELETE_ALARM':

      mixinRequest.xhr('delete', 'alarms/'+action.id, null, (function (result) {

        clearTimeout(alarmsStore.alarms[result].timer);

        alarmsStore.alarms.splice(result, 1);
        alarmsStore.emit('CHANGE');

      }));

      break;

    case 'FIND_ALARMS':

      mixinRequest.xhr('get', 'alarms', null, (function (result) {

        for (var i = 0; i < result.length; i++) {
          result[i].timer = addAlarmRing(result[i].hour, result[i].minutes, result[i].music);
        }

        alarmsStore.alarms = result;
        alarmsStore.emit('CHANGE');
      }));
      break;

    default:
      break;
  }
});

module.exports = alarmsStore;