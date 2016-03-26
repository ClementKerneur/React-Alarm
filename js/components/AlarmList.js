var React = require( 'react' );

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
      return ( 
        <li className="alarm">
          <h2 className="name">
            {alarm.name}
          </h2>
          <p>
            {alarm.time}
          </p>
        </li>
      );
    });

    return (
      <ul className="alarms">
        {alarms}
      </ul>
    );

  }

});


module.exports = AlarmList;
