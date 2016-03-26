var React = require( 'react' );
var AlarmList = require( './AlarmList.js' );

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
