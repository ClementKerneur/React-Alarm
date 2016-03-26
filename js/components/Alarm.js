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

  render: function() {
    return ( 
      <li className="alarm">
        <div className="description">
          <h2 className="name">
            {this.props.data.name}
          </h2>
          <p className="time">
            {this.props.data.time}
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
