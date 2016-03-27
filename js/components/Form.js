var React = require( 'react' );
var mixinSound = require( '../mixins/sound.js' );

var Form = React.createClass({
  mixins: [ mixinSound ],

  getInitialState: function () {
    if (this.props.params) {
      return this.props.params;
    }
    else {
      return {
        name: '',
        hour: 0,
        minutes: 0,
        days: [
          {
            title:'Mo',
            active: false
          },
          {
            title:'Tu',
            active: false
          },
          {
            title:'We',
            active: false
          },
          {
            title:'Th',
            active: false
          },
          {
            title:'Fr',
            active: false
          },
          {
            title:'Sa',
            active: false
          },
          {
            title:'Su',
            active: false
          }
        ],
        music: 0
      }
    }
  },

  render: function() {
    var daysRender = this.state.days.map((function (data, index) {
      return <DaysSelectItem data={data} key={index} index={index} onChange={this._onChangeDays} />
    }).bind(this));

    var title =  this.props.params ? 'Edit this alarm': 'Create new alarm';
    var titleSubmit =  this.props.params ? 'Update alarm': 'Add alarm';

    return (
      <div>

        <div className="title">
          <h1>{title}</h1>
          <div className="backWrapper" onClick={this._onClickBack}>
            <span className="back"></span>
          </div>
        </div>
        
        <form onSubmit={this._onSubmit}>

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

            <div className="radioWrap">
              <input id="classic" type="radio"  value="1" name="music" onChange={this._onChangeMusic} checked={this._isActiveMusic('1')}/>
              <div className="check"></div>
              <label htmlFor="classic"  className="musicLabel">CLassic</label>
            </div>

            <div className="radioWrap">
              <input id="funny" type="radio"  value="2" name="music" onChange={this._onChangeMusic} checked={this._isActiveMusic('2')}/>
              <div className="check"></div>
              <label htmlFor="funny"  className="musicLabel">Funny</label>
            </div>

            <div className="radioWrap">
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
    
    tmpDays[value].active = tmpDays[value].active ? false : true;

    this.setState({
      days: tmpDays
    });
  },

  _onChangeMusic: function (event) {
    this.playMusicById(event.target.value).play();

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
  },

  _onClickBack: function() {
    this.props.goTo('index');
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

  render: function () {
    var activeClass = this.props.data.active ? 'active' : '';

    return (
      <li className={activeClass} onClick={this._onClick}>
        <p>{this.props.data.title}</p>
      </li>
    );
  },

  _onClick: function () {
    this.props.onChange( this.props.index );
  }
});

module.exports = Form;
