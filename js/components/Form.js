var React = require( 'react' );
var minxinRequest = require( '../mixins/request.js' );

function pad(n) {
    if (n < 10)
        return "0" + n;
    return n;
}

var Form = React.createClass({
  mixins: [minxinRequest],

  getInitialState: function () {
    return {
      name: '',
      hour: '',
      minutes: ''
    }
  },

  render: function() {
    return (
      <div>
        <h1>Add new alarm</h1>
        <form onSubmit={this._onSubmit}>
          <input type="text" onChange={this._onChangeName} value={this.state.name} />
          <input type="number" onChange={this._onChangeHour} value={this.state.hour} />
          <input type="number" onChange={this._onChangeMinutes} value={this.state.minutes} />
          <button type="submit"></button>
        </form>
      </div>
    );

  },

  _onAddAlarm: function(event) {
    event.preventDefault();

    this.props.parent._GoToForm();
  },

  _onChangeName: function(event) {
    this.setState({
      name: event.target.value
    });
  },

  _onChangeHour: function(event) {
    this.setState({
      hour: event.target.value
    });
  },

  _onChangeMinutes: function(event) {
    this.setState({
      minutes: event.target.value
    });
  },

  _onSubmit: function (event) {
    event.preventDefault();
  
    this.props.onAddAlarm(this.state.name, pad(this.state.hour)+':'+pad(this.state.minutes));
  }

});


module.exports = Form;
