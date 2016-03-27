var React = require( 'react' );

var AlarmList = React.createClass({

  render: function() {
    var alarms = this.props.alarms.map( (function(data, index) {
      return <AlarmListItem data={data} key={index} index={index} onDelete={this.props.onDeleteAlarm} />
    }).bind(this) );

    return (
      <div>
        <h1>React Alarm</h1>
        <div className="add" onClick={this._onAddAlarm}>Add</div>
        <ul className="alarms">
          {alarms}
        </ul>
      </div>
    );

  },

  _onAddAlarm: function() {
    this.props.goTo('form');
  }


});


var AlarmListItem = React.createClass({

  addZero : function (n) {
    if (n < 10) {
      return "0" + n;
    }
    return n;
  },

  render: function() {
    return ( 
      <li className="alarm">
        <div className="description">
          <h2 className="label">
            {this.props.data.name}
          </h2>
          <p className="time">
            {this.addZero(this.props.data.hour)} : {this.addZero(this.props.data.minutes)}
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
  }

});

module.exports = AlarmList;
