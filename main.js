(function() {
  var httpRequest;
	var conditions = '';

	var content = document.getElementById('content');

  makeRequest();

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('Giving up. Cannot create an XMLHTTP instance');
      return false;
    }

    var endpoint = 'http://localhost:3000/weather';
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', endpoint, true);
	  httpRequest.responseType = 'json';
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        console.log(httpRequest.response);
	      let res = httpRequest.response;
	      
	      conditions = res.latitude;
		content.innerHTML = conditions;
      } else {
        console.log('There was a problem with the request.');
      }
    }
  }
})();
