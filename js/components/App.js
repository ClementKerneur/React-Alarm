var React       = require( 'react' );
var AlarmList   = require( './Alarm.js' );
var form        = require( './Form.js' );
var mixinRequest= require( '../mixins/request.js' );
var mixinSound  = require( '../mixins/sound.js' );
var storage  = require( '../components/storage.js' );

var App = React.createClass({
  mixins: [mixinRequest, mixinSound],

  getInitialState: function() {
    return {
      params: null,
      alarms: []
    }
  },

  componentDidMount: function () {
    this._getDatasFromServer();
  },

  render: function () {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  },

  _addAlarmRing: function(hour, minutes, soundId) {
    now = new Date;
    alarmTime = new Date;
    alarmTime.setHours(Number(hour), Number(minutes), 0);
    
    if( alarmTime > now ) {
      whenDring = alarmTime.getTime() - now.getTime();

      return setTimeout( ( function() {
        this.playMusicById(soundId).play();
      }).bind(this), whenDring);
    }
    return false;
  },

  _getDatasFromServer: function() {
    this.xhr('get', 'alarms', null, (function (results) {


      results = results.map((function (result) {
        result.timer = this._addAlarmRing(result.hour, result.minutes, result.music);
        
        storage = result;
        return result;        
      }).bind(this));

    }).bind(this));
  },

  _onDeleteAlarm: function (id) {
    this.xhr('delete', 'alarms/'+id, null, (function (result) {
      console.log( this.state.alarms[id].timer );
      clearTimeout(this.state.alarms[id].timer);

      var tmpAlarms = this.state.alarms;
      tmpAlarms.splice(result, 1);

      this.setState({
        alarms: tmpAlarms
      });

    }).bind(this));

  },

  _onAddAlarm: function (newAlarm) {
    this.xhr('post', 'alarms', newAlarm, (function (result) {

      result.timer = this._addAlarmRing(result.hour, result.minutes, result.music);

      var tmpAlarms = this.state.alarms.concat(result);
      this.setState({
        alarms: tmpAlarms
      });

      // this._goTo('index');

    }).bind(this));

  },

  _onEditAlarm: function (editAlarm) {
    this.xhr('PATCH', 'alarms/'+editAlarm.id, editAlarm, (function (result) {
      clearTimeout(this.state.alarms[editAlarm.id].timer);
      result.timer = this._addAlarmRing(result.hour, result.minutes, result.music);

      var tmpAlarms = this.state.alarms;
      tmpAlarms[editAlarm.id] = editAlarm;
      this.setState({
        alarms: tmpAlarms
      });

      // this._goTo('index');

    }).bind(this));
  }


});

module.exports = App;
