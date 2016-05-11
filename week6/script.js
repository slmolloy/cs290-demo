var appid = 'fa7d80c48643dfadde2cced1b1be6ca1';

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
  document.getElementById('locationSubmit').addEventListener('click', function(event) {
    event.preventDefault();

    var searchLocation = document.getElementById('searchLocation').value;
    var req = new XMLHttpRequest();
    req.open('GET', buildUrl(searchLocation), true);

    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        document.getElementById('weatherLocation').textContent = response.name;
        document.getElementById('weatherCondition').textContent = response.weather[0].description;
        document.getElementById('weatherTemp').textContent = response.main.temp + 'F';
        document.getElementById('weatherHumidity').textContent = response.main.humidity + '%';
        console.log(response);
      } else {
        console.log('Error fetching weather data: ' + req.statusText);
      }
    });
    req.send(null);
  });
}

function buildUrl(searchLocation) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  url += searchLocation;
  url += '&appid=' + appid;
  url += '&units=imperial';
  console.log(url);
  return url;
}