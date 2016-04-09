var Reflux = require('reflux');

var alarmAction = require( '../actions/alarmAction.js' );

var mixinRequest = require( '../mixins/request.js' );
var mixinSound = require( '../mixins/sound.js' );


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



var alarmsStore = Reflux.createStore({

  mixins: [mixinRequest],

  init: function() {
    this.alarms = [{
      name: 'sdfasd',
      hour: 10,
      minutes: 10,
      days: []
    }];

    this.listenTo(alarmAction.add, this.add);
    this.listenTo(alarmAction.edit, this.edit);
    this.listenTo(alarmAction.delete, this.delete);
    this.listenTo(alarmAction.findAll, this.findAll);
  },

  add: function(alarm) {
    this.xhr('post', 'alarms', alarm, (function (result) {

      result.timer = addAlarmRing(result.hour, result.minutes, result.music);

      this.alarms.push(result);
      this.trigger(this.alarms);

    }).bind(this));
  },

  edit: function(alarm) {
    this.xhr('PATCH', 'alarms/'+alarm.id, alarm, (function (result) {

      clearTimeout(this.alarms[result.id].timer);
      result.alarm.timer = addAlarmRing(result.alarm.hour, result.alarm.minutes, result.alarm.music);

      this.alarms[result.id] = result.alarm;
      this.trigger(this.alarms);

    }).bind(this));
  },

  delete: function(id) {
    this.xhr('delete', 'alarms/'+id, null, (function (result) {

      clearTimeout(this.alarms[result].timer);

      this.alarms.splice(result, 1);
      this.trigger(this.alarms);

    }).bind(this));
  },

  findAll: function() {
    this.xhr('get', 'alarms', null, (function (result) {

      for (var i = 0; i < result.length; i++) {
        result[i].timer = addAlarmRing(result[i].hour, result[i].minutes, result[i].music);
      }

      this.alarms = result;
      this.trigger(this.alarms);

    }).bind(this));
  }

});

module.exports = alarmsStore;