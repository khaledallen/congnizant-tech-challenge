(function() {
  var httpRequest;
  document.getElementById("ajaxButton").addEventListener('click', makeRequest);

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    var endpoint = 'http://localhost:3000';
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', endpoint, true);
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
})();
