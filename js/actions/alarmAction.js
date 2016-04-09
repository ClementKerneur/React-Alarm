var Reflux = require('reflux');

var alarmAction = {
	add: 		Reflux.createAction(),
	edit: 		Reflux.createAction(),
	delete: 	Reflux.createAction(),
	findAll: 	Reflux.createAction()
}

module.exports = alarmAction;