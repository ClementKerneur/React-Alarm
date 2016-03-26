var minxinRequest = {
	xhr: function (type, url, body, response) {
		var xhr = new XMLHttpRequest();

	    xhr.open(type, '/'+url);

		xhr.setRequestHeader("Content-type", "application/json");

	    xhr.onload = ( function() {
	      if( xhr.status >= 200 && xhr.status <= 400 ) {
	        return response(JSON.parse(xhr.responseText));
	      }
	    } ).bind(this);

	    var datas = body ? JSON.stringify(body) : '';
	    xhr.send(datas);
	}
}

module.exports = minxinRequest;