(function() {
  var httpRequest;
	var conditions = '';

	var content = document.getElementById('content');
	var yourName = document.getElementById('your-name');
	var submitName = document.getElementById('submit-name-btn').addEventListener('click', changeName);
	var nameField = document.getElementById('name-field');

	yourName.innerHTML = "Khaled";

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
	      let res = httpRequest.response;
	      
	      conditions = res.currently.summary;
	      content.innerHTML = conditions;

      } else {
        console.log('There was a problem with the request.');
      }
    }
  }

	function changeName(e) {
		e.preventDefault();
		var name = nameField.value;

		yourName.innerHTML = name;
	}
})();
