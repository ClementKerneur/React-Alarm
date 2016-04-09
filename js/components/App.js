var React = require( 'react' );
var Reflux = require('reflux');

var alarmsStore = require( '../stores/alarmStore.js' );
var alarmAction = require( '../actions/alarmAction.js' );

var AlarmList = require( './Alarm.js' );
var Form = require( './Form.js' );

var App = React.createClass({
  mixins: [ Reflux.connect(alarmsStore, "alarms") ],

  getInitialState: function() {
    return {
      page: 'index',
      params: null,
      alarms: alarmsStore.alarms
    }
  },

  componentWillMount: function () {
    alarmAction.findAll();
  },

  render: function () {
    console.log(this.state.alarms);

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

  _goTo: function (page, params) {
    this.setState({
      page: page,
      params: params
    });
  }
});

module.exports = App;
