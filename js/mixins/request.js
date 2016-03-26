var minxinRequest = {
	xhr: function (type, url, params, response) {
		var xhr = new XMLHttpRequest();
		console.log('passed')
	    xhr.open(type, '/'+url);

	    xhr.onload = ( function() {
	      if( xhr.status >= 200 && xhr.status <= 400 ) {
	        return response(JSON.parse(xhr.responseText));
	      }
	    } ).bind(this);

	    var datas = params ? JSON.stringify(params) : '';
	    xhr.send(datas);
	}
}

module.exports = minxinRequest;