var ReactDom 		= require( 'react-dom' );
var React 			= require( 'react' );

var ReactRouter 	= require('react-router');
var Router      	= ReactRouter.Router;
var browserHistory 	= ReactRouter.browserHistory;
var Route       	= ReactRouter.Route;
var IndexRoute  	= ReactRouter.IndexRoute;

var App 			= require( './components/App.js' );
var AlarmList   	= require( './components/Alarm.js' );
var FormAlarm       = require( './components/Form.js' );

ReactDom.render(

	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={AlarmList}/>
			<Route path="new" component={FormAlarm} />
			<Route path="edit/:id" component={FormAlarm}/>
		</Route>
	</Router>

, document.getElementById('app') );
 