var React = require( 'react' );
var minxinRequest = require( '../mixins/request.js' );

var Form = React.createClass({
  mixins: [minxinRequest],

  getInitialState: function () {
    return {
      name: '',
      hour: '',
      minutes: '',
      days: []
    }
  },

  render: function() {
    return (
      <div>
        <h1>Add new alarm</h1>
        <form onSubmit={this._onSubmit}>
          <input type="text" onChange={this._onChangeInput} name="name" value={this.state.name} />
          <input type="number" onChange={this._onChangeInput} name="hour" value={this.state.hour} />
          <input type="number" onChange={this._onChangeInput} name="minutes" value={this.state.minutes} />
          <DaysSelect label="Days">
            <DaysSelectItem value="mon" onChange={this._onChangeDays}>Mon</DaysSelectItem>
            <DaysSelectItem value="tue" onChange={this._onChangeDays}>Tue</DaysSelectItem>
            <DaysSelectItem value="wed" onChange={this._onChangeDays}>Wed</DaysSelectItem>
          </ DaysSelect>
          <button type="submit"></button>
        </form>
      </div>
    );

  },

  _onChangeInput: function(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  },

  _onChangeDays: function (value) {
    var tmpDays = this.state.days
    var index = tmpDays.indexOf( value )

    if( index == -1 ) {
      tmpDays.push( value );
    }
    else {
      tmpDays.splice( index, 1 );
    }

    this.setState({
      days: tmpDays
    });
  },

  _onSubmit: function (event) {
    event.preventDefault();
 
    var days = this.state.days;
 
    this.props.onAddAlarm({
      name: this.state.name,
      hour: this.state.hour,
      minutes: this.state.minutes,
      days: days
    });
  }

});

var DaysSelect = React.createClass({

  render: function () {
    return (
      <div className="daysSelect">
        <label>{this.props.label}</label>
        <ul>{this.props.children}</ul>
      </div>
    );
  },

});

var DaysSelectItem = React.createClass({

  getInitialState: function () {
    return {
      active: false
    }
  },

  render: function () {
    var activeClass = this.state.active ? 'active' : '';

    return (
      <li className={activeClass} onClick={this._onClick}>{this.props.children}</li>
    );
  },

  _onClick: function () {

    this.props.onChange( this.props.value );

    this.setState({
      active: !this.state.active
    });
  }
});

module.exports = Form;
