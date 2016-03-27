var React = require( 'react' );
var minxinRequest = require( '../mixins/request.js' );
var howler = require( 'howler' );

var Form = React.createClass({
  mixins: [minxinRequest],

  getInitialState: function () {
    return {
      name: '',
      hour: '',
      minutes: '',
      days: [],
      music: 0
    }
  },

  render: function() {
    return (
      <div>
        <h1>Add new alarm</h1>
        <form onSubmit={this._onSubmit}>
          <label className="label" htmlFor="formName">ALARM NAME</label>
          <input id="formName" type="text" name="name" placeholder="my new alarm" onChange={this._onChangeInput} value={this.state.name}/>

          <label className="label" htmlFor="formHour">TIME</label>
          <input id="formHour" type="number" name="hour" onChange={this._onChangeInput} value={this.state.hour} />
          <input type="number" name="minutes" onChange={this._onChangeInput} value={this.state.minutes} />

          <label className="label">DATE</label>
          <DaysSelect label="Days">
            <DaysSelectItem value="mon" onChange={this._onChangeDays}>Mon</DaysSelectItem>
            <DaysSelectItem value="tue" onChange={this._onChangeDays}>Tue</DaysSelectItem>
            <DaysSelectItem value="wed" onChange={this._onChangeDays}>Wed</DaysSelectItem>
          </ DaysSelect>

          <label className="label">Music</label>
          <input id="classic" type="radio"  value="1" name="music" onChange={this._onChangeMusic} checked={this._isActiveMusic('1')}/>
          <label htmlFor="classic">CLassic</label>
          <input id="funny" type="radio"  value="2" name="music" onChange={this._onChangeMusic} checked={this._isActiveMusic('2')}/>
          <label htmlFor="funny">Funny</label>
          <input id="modern" type="radio"  value="3" name="music" onChange={this._onChangeMusic} checked={this._isActiveMusic('3')}/>
          <label htmlFor="modern">Modern</label>

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

  _onChangeMusic: function (event) {
    var sound = new howler.Howl({
      urls: ['audio/'+event.target.id+'.mp3'],
      volume: 0.8,
      sprite: { preview: [0, 3000] }
    });
    sound.fade(0.0, 0.8, 500);
    sound.play('preview');

    this.setState({
      music: event.target.value
    });
  },

  _isActiveMusic: function(value) {
    return value == this.state.music ? true : false;
  },

  _onSubmit: function (event) {
    event.preventDefault();
 
    this.props.onAddAlarm({
      name: this.state.name,
      hour: this.state.hour,
      minutes: this.state.minutes,
      days: this.state.days,
      music: this.state.music
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
