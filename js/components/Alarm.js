var React = require( 'react' );

var AlarmList = React.createClass({

  render: function() {
    var alarms = this.props.alarms.map( (function(data, index) {
      return <AlarmListItem data={data} key={index} index={index} goTo={this.props.goTo} onDelete={this.props.onDeleteAlarm} />
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
  },


});


var AlarmListItem = React.createClass({

  pad : function (n) {
    if (n < 10) {
      return "0" + n;
    }
    return n;
  },

  render: function() {
    return ( 
      <li className="alarm" onClick={this._onEdit}>
        <div className="description">
          <h2 className="name">
            {this.props.data.name}
          </h2>
          <p className="time">
            {this.pad(this.props.data.hour)} : {this.pad(this.props.data.minutes)}
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
  
    this.props.goTo('form', tmpAlarm);
  }

});

module.exports = AlarmList;
