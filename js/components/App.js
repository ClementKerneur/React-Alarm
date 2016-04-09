var React = require( 'react' );
var AlarmList = require( './Alarm.js' );
var Form = require( './Form.js' );

var alarmsStore = require( '../stores/alarmStore.js' );
var alarmAction = require( '../actions/alarmAction.js' );

var App = React.createClass({

  getInitialState: function() {
    return {
      page: 'index',
      params: null,
      alarms: alarmsStore.alarms
    }
  },

  componentWillMount: function () {
    alarmsStore.on('CHANGE', this._alarmsLoad);
    alarmAction.findAll();
  },

  componentWillUnmount: function() {
    alarmsStore.removeListener('CHANGE', this._alarmsLoad);
  },

  render: function () {

    switch(this.state.page) {
      case 'index':
        var page = <AlarmList alarms={this.state.alarms} goTo={this._goTo} />
        break;
      case 'form':
        var page = <Form goTo={this._goTo} params={this.state.params}/>
        break;
      default:
        var page = <AlarmList alarms={this.state.alarms} goTo={this._goTo} />
    }

    return (
      <div className="App">
        {page}
      </div>
    );
  },

  _alarmsLoad: function () {
    this.setState({
      alarms: alarmsStore.alarms
    });
  },

  _goTo: function (page, params) {
    this.setState({
      page: page,
      params: params
    });
  }

  // _getDatasFromServer: function() {
  //   this.xhr('get', 'alarms', null, (function (results) {


  //     results = results.map((function (result) {
  //       result.timer = this._addAlarmRing(result.hour, result.minutes, result.music);
        
  //       return result;        
  //     }).bind(this));

  //     this.setState({
  //         alarms: results
  //     });
  //   }).bind(this));
  // },

  // _onDeleteAlarm: function (id) {
  //   this.xhr('delete', 'alarms/'+id, null, (function (result) {
  //     console.log( this.state.alarms[id].timer );
  //     clearTimeout(this.state.alarms[id].timer);

  //     var tmpAlarms = this.state.alarms;
  //     tmpAlarms.splice(result, 1);

  //     this.setState({
  //       alarms: tmpAlarms
  //     });

  //   }).bind(this));

  // },

  // _onAddAlarm: function (newAlarm) {
  //   this.xhr('post', 'alarms', newAlarm, (function (result) {

  //     result.timer = this._addAlarmRing(result.hour, result.minutes, result.music);

  //     var tmpAlarms = this.state.alarms.concat(result);
  //     this.setState({
  //       alarms: tmpAlarms
  //     });

  //     this._goTo('index');

  //   }).bind(this));

  // },

  // _onEditAlarm: function (editAlarm) {
  //   this.xhr('PATCH', 'alarms/'+editAlarm.id, editAlarm, (function (result) {
  //     clearTimeout(this.state.alarms[editAlarm.id].timer);
  //     result.timer = this._addAlarmRing(result.hour, result.minutes, result.music);

  //     var tmpAlarms = this.state.alarms;
  //     tmpAlarms[editAlarm.id] = editAlarm;
  //     this.setState({
  //       alarms: tmpAlarms
  //     });

  //     this._goTo('index');

  //   }).bind(this));
  // }
});

module.exports = App;
