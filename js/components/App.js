var React = require( 'react' );

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
      </li>
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

  render: function() {
    var alarms = this.state.alarms.map( function(alarm) {
      return <AlarmListItem data={alarm} />
    });

    return (
      <div>
        <h1>React Alarm</h1>
        <ul className="alarms">
          {alarms}
        </ul>
      </div>
    );

  }

});


var App = React.createClass({

  render: function () {
    return (
      <div className="App">
        <AlarmList />
      </div>
    );
  }

});

module.exports = App;
