var Dispatcher = require('../dispatcher.js');

var alarmAction = {
	add: function (alarm) {
		Dispatcher.dispatch({
			actionType: 'ADD_ALARM',
			alarm: alarm
		});
	},
	edit: function (alarm) {
		Dispatcher.dispatch({
			actionType: 'EDIT_ALARM',
			alarm: alarm
		});
	},
	delete: function (id) {
		Dispatcher.dispatch({
			actionType: 'DELETE_ALARM',
			id: id
		});
	},
	findAll: function () {
		Dispatcher.dispatch({
			actionType: 'FIND_ALARMS'
		});
	}

}

module.exports = alarmAction;