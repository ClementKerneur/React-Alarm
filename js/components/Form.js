var React = require( 'react' );
var minxinRequest = require( '../mixins/request.js' );
var howler = require( 'howler' );

var Form = React.createClass({
  getInitialState: function () {
    if (this.props.params) {
      return this.props.params;
    }
    else {
      return {
        name: '',
        hour: 0,
        minutes: 0,
        days: [],
        music: 0
      }
    }
  },

  render: function() {

    var daysRender = ['Mo','Tu','We','Th','Fr','Sa','Su'].map((function (day, index) {
      return <DaysSelectItem value={day} key={index} onChange={this._onChangeDays}>{day}</DaysSelectItem>
    }).bind(this));

    var title =  this.props.params ? 'Edit this alarm': 'Create new alarm';
    var titleSubmit =  this.props.params ? 'Update alarm': 'Add alarm';

    return (
      <div>
        <h1>{title}</h1>
        <form onSubmit={this._onSubmit}>
          <div className="warp">
            <label className="label" htmlFor="formName">ALARM NAME</label>
            <input id="formName" type="text" name="name" placeholder="my new alarm" onChange={this._onChangeInput} value={this.state.name}/>

            <label className="label" htmlFor="formHour">TIME</label>
            <div className={'timeWrap '+this._isLessTen(this.state.hour)}>
              <input id="formHour" className="time" type="number" name="hour" min="0" max="23" onChange={this._onChangeInput} value={this.state.hour} />
            </div>
            <div className={'timeWrap timeWrap2 '+this._isLessTen(this.state.minutes)}>
              <input type="number" className="time" name="minutes" min="0" max="59" onChange={this._onChangeInput} value={this.state.minutes} />
            </div>

            <DaysSelect label="Days">
              {daysRender}
            </ DaysSelect>

            <label className="label">Music</label>

            <input id="classic" type="radio"  value="1" name="music" onChange={this._onChangeMusic} checked={this._isActiveMusic('1')}/>
            <div className="check"></div>
            <label htmlFor="classic"  className="musicLabel">CLassic</label>

            <input id="funny" type="radio"  value="2" name="music" onChange={this._onChangeMusic} checked={this._isActiveMusic('2')}/>
            <div className="check"></div>
            <label htmlFor="funny"  className="musicLabel">Funny</label>

            <input id="modern" type="radio"  value="3" name="music" onChange={this._onChangeMusic} checked={this._isActiveMusic('3')}/>
            <div className="check"></div>
            <label htmlFor="modern"  className="musicLabel">Modern</label>
          </div>

          <button type="submit">{titleSubmit}</button>
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
    // var sound = new howler.Howl({
    //   urls: ['audio/'+event.target.id+'.mp3'],
    //   volume: 0.8,
    //   sprite: { preview: [0, 3000] }
    // });
    // sound.fade(0.0, 0.8, 500);
    // sound.play('preview');

    this.setState({
      music: event.target.value
    });
  },

  _isActiveMusic: function(value) {
    return value == this.state.music ? true : false;
  },

  _isLessTen: function(state) {
    return state < 10 ? 'addZero' : '';
  },

  _onSubmit: function (event) {
    event.preventDefault();

    this.props.params ? this.props.onEditAlarm(this.state) : this.props.onAddAlarm(this.state);
  }

});

var DaysSelect = React.createClass({

  render: function () {
    return (
      <div>
        <label className="label">{this.props.label}</label>
        <ul className="days">{this.props.children}</ul>
      </div>
    );
  }

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
      <li className={activeClass} onClick={this._onClick}>
        <p>{this.props.children}</p>
      </li>
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
