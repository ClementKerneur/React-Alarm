var React = require( 'react' );
var AlarmList = require( './Alarm.js' );
var Form = require( './Form.js' );
var minxinRequest = require( '../mixins/request.js' );

var App = React.createClass({
  mixins: [minxinRequest],

  getInitialState: function() {
    return {
      page: 'index',
      alarms: []
    }
  },

  componentDidMount: function () {
    this._getDatasFromServer();
  },

  render: function () {

    switch(this.state.page) {
      case 'index':
        var page = <AlarmList alarms={this.state.alarms} onDeleteAlarm={this._onDeleteAlarm} goTo={this._goTo} />
        break;
      case 'form':
        var page = <Form goTo={this._goTo} />
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

  _goTo: function (page) {
    this.setState({
      page: page
    });
  },

  _getDatasFromServer: function() {
    this.xhr('get', 'alarms', null, (function (result) {
      this.setState({
          alarms: result
      });
    }).bind(this));
  },

  _onDeleteAlarm: function (id) {
    this.xhr('delete', 'alarms/'+id, null, (function (result) {

      var tmpAlarms = this.state.alarms;
      tmpAlarms.splice(result, 1);

      this.setState({
        alarms: tmpAlarms
      });

    }).bind(this));
  }

});

module.exports = App;
