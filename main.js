(function() {
  var httpRequest;

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
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        console.log('Request Successful');
      } else {
        console.log('There was a problem with the request.');
      }
    }
  }
})();
