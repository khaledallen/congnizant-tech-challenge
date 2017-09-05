(function() {
  var httpRequest;
	var conditions = '';

	var content = document.getElementById('content');
	var yourName = document.getElementById('your-name');
	var submitName = document.getElementById('submit-name-btn').addEventListener('click', changeName);
	var nameField = document.getElementById('name-field');

	yourName.innerHTML = "Khaled";
	var wxCol = document.getElementsByClassName('wx');

	console.log(wxCol);
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
	      let res = httpRequest.response.currently;
	      
	      conditions = res.summary;
	      content.innerHTML = conditions;
	      let wx = res.icon;

	      document.getElementById('jumbotron').className += " " + wx + "-image";
	      for(let i = 0; i < wxCol.length; i++) {
		      wxCol[i].className += " " + wx;
	      }

	      var r = Math.floor((res.dewPoint / 100) * 255);
	      var g = Math.floor((res.humidity) * 255);
	      var b = Math.floor((res.temperature/100) * 255);
	      var nameColor = 'rgba(' + r + ',' + g + ',' + b + ',1)';
	      yourName.style.color = nameColor;

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
