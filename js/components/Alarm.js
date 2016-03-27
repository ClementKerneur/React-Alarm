var React = require( 'react' );

var AlarmList = React.createClass({

  render: function() {
    var alarms = this.props.alarms.map( (function(data, index) {
      return <AlarmListItem data={data} key={index} index={index} goTo={this.props.goTo} onDelete={this.props.onDeleteAlarm} />
    }).bind(this) );

    return (
      <div>
        <div className="title">
          <h1>React Alarm</h1>
          <div className="crossWrapper" title="add an alarm" onClick={this._onAddAlarm}>
             <span className="cross"></span>
          </div>
        </div>

        <ul className="alarms">
          {alarms}
        </ul>
      </div>
    );

  },

  _onAddAlarm: function() {
    this.props.goTo('form');
  },


});


var AlarmListItem = React.createClass({

  addZero : function (n) {
    if (n < 10) {
      return "0" + n;
    }
    return n;
  },

  render: function() {
    var listDay = this.props.data.days.map(function (data) {
      return data+" ";
    })

    return ( 
      <li className="alarm">
        <div className="description">
          <h2 className="label" onClick={this._onEdit}>
            {this.props.data.name}
          </h2>
          <p className="time">
            {this.addZero(this.props.data.hour)} : {this.addZero(this.props.data.minutes)}
          </p>
          <p className="listDay">
            {listDay}
          </p>
        </div>
        <div className="closeWrapper" onClick={this._onDelete}>
          <span className="cross close"></span>
        </div>
      </li>
    );
  },

  _onDelete: function () {
    this.props.onDelete(this.props.index);
  },

  _onEdit: function() {
    tmpAlarm = this.props.data;
    tmpAlarm.id = this.props.index;
    console.log(tmpAlarm);
  
    this.props.goTo('form', tmpAlarm);
  }

});

module.exports = AlarmList;
