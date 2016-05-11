/*
 * Part 1
 */
var appid = 'fa7d80c48643dfadde2cced1b1be6ca1';

document.addEventListener('DOMContentLoaded', bindWeatherButton);
document.addEventListener('DOMContentLoaded', bindPostyButton);

function bindWeatherButton() {
  document.getElementById('locationSubmit').addEventListener('click', function(event) {
    event.preventDefault();

    var searchLocation = document.getElementById('searchLocation').value;
    var req = new XMLHttpRequest();
    req.open('GET', buildWeatherUrl(searchLocation), true);

    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        document.getElementById('weatherLocation').textContent = response.name;
        document.getElementById('weatherCondition').textContent = response.weather[0].description;
        document.getElementById('weatherTemp').textContent = response.main.temp + 'F';
        document.getElementById('weatherHumidity').textContent = response.main.humidity + '%';
      } else {
        console.log('Error fetching weather data: ' + req.statusText);
      }
    });
    req.send(null);
  });
}

function buildWeatherUrl(searchLocation) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  url += searchLocation;
  url += '&appid=' + appid;
  url += '&units=imperial';
  return url;
}



/*
 * Part 2
 */
function bindPostyButton(){
  document.getElementById('postySubmit').addEventListener('click', function(event) {
    event.preventDefault();

    var req = new XMLHttpRequest();
    var payload = document.getElementById('postData').value;
    var jsonPaylod = JSON.stringify(payload);
    req.open('POST', buildPostyUrl(), true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        document.getElementById('dataResult').textContent = response.data;
      }
    });

    document.getElementById('dataPosted').textContent = jsonPaylod;
    req.send(jsonPaylod);
  })
}

function buildPostyUrl() {
  return 'http://httpbin.org/post';
}