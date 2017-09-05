(function() {
  var httpRequest;
	var conditions = '';

	var content = document.getElementById('content');
	var yourName = document.getElementById('your-name');
	var submitName = document.getElementById('submit-name-btn').addEventListener('click', changeName);
	var nameField = document.getElementById('name-field');
	yourName.innerHTML = "Khaled";

	var lon = document.getElementById('lon-field');
	var lat = document.getElementById('lat-field');
	var submitCoords = document.getElementById('submit-customcoords-btn').addEventListener('click', customWx);

	var wxCol = document.getElementsByClassName('wx');

	makeRequest();

  function makeRequest(lon,lat) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('Giving up. Cannot create an XMLHTTP instance');
      return false;
    }

    var endpoint = 'http://localhost:3000/weather';
    var coords = {}; 
	  if(lon !== undefined && lat !== undefined) {
		  coords.longitude = lon,
	          coords.latitude=lat
	  } else {
		  coords.longitude = '-105.285884',
		  coords.latitude = '40.016457'
	  }
    httpRequest.onreadystatechange = applyWx;
    httpRequest.open('POST', endpoint, true);
    httpRequest.setRequestHeader("Content-type", "application/json");

    httpRequest.responseType = 'json';
    httpRequest.send(JSON.stringify(coords));
  }

  function applyWx() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
	      let res = httpRequest.response.currently;
	      
	      conditions = res.summary;
	      content.innerHTML = conditions;
	      let wx = res.icon;

	      document.getElementById('jumbotron').className = "jumbotron " + wx + "-image";
	      for(let i = 0; i < wxCol.length; i++) {
		      wxCol[i].className = "wx " + wx;
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
		var name = nameField.value;
		yourName.innerHTML = name;
	}

	function customWx() {
		var lonCoord = lon.value;
		var latCoord = lat.value;
		makeRequest(lonCoord, latCoord);
	}
})();
