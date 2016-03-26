var React = require( 'react' );
var minxinRequest = require( '../mixins/request.js' );

var Form = React.createClass({
  mixins: [minxinRequest],

  render: function() {
    return (
      <div>
        <h1>Add new alarm</h1>
      </div>
    );

  },

  _onAddAlarm: function(event) {
    event.preventDefault();

    this.props.parent._GoToForm();
  },

});

module.exports = Form;
