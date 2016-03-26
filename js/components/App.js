var React = require( 'react' );

var App = React.createClass({

  render: function () {
    return (
      <div className="App">
        <AlarmList />
      </div>
    );
  }

});


var AlarmList = React.createClass({
  getInitialState: function() {
    return {
      alarms: [
        {
          name: 'wake up',
          time: '07:30'
        },
        {
          name: 'go to beach',
          time: '16:45'
        }
      ]
    };
  },

  _onAddAlarm: function(event) {
    event.preventDefault();

    var newAlarm = {
      name : this.refs.name.value,
      time : this.refs.time.value
    }

    var tmpAlarms = this.state.alarms;
    tmpAlarms.push(newAlarm);

    this.setState({
      alarms: tmpAlarms
    });
  },

  _onDeleteAlarm: function (id) {
    var tmpAlarms = this.state.alarms;
    tmpAlarms.splice(id, 1);

    this.setState({
      alarms: tmpAlarms
    });
  },

  render: function() {
    var alarms = this.state.alarms.map( (function(data, index) {
      return <AlarmListItem data={data} key={index} index={index} onDelete={this._onDeleteAlarm}/>
    }).bind(this) );

    return (
      <div>
        <h1>React Alarm</h1>
        <form onSubmit={this._onAddAlarm} >
          <input type="text" placeholder="Name" ref="name"/>
          <input type="text" placeholder="Time" ref="time"/>
          <button type="submit">Add value</button>
        </form>
        <ul className="alarms">
          {alarms}
        </ul>
      </div>
    );

  }

});


var AlarmListItem = React.createClass({

  _onDelete: function () {
    this.props.onDelete(this.props.index);
  },

  render: function() {
    console.log(this.props);
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
  }

});

module.exports = App;
