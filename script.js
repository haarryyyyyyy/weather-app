const apiKey = 'a9f10655a42b42fbb8b162730231104';
var img = document.getElementById("img");
var temp = document.getElementById("temp");
var rain = document.getElementById("rain");
var wind = document.getElementById("wind");
var humid = document.getElementById("humid");

function getCity() {
  var city = document.getElementById("city").value;
  if (city == "") {
    alert("Enter a valid city");
    return false;
  } else {
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if(data.error){
        alert(data.error.message);
        }else{
        document.getElementById("name").innerHTML = data.location.name;
        img.src = data.current.condition.icon;
        temp.innerHTML = data.current.temp_c + '°C';
        humid.innerHTML = data.current.humidity + '%';
        wind.innerHTML = data.current.wind_kph + 'KM';
        rain.innerHTML = data.current.cloud + '%';
        }
      })

}
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log(lat, long);
  let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat} ${long}`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      document.getElementById("name").innerHTML = data.location.name;
      img.src = data.current.condition.icon;
      temp.innerHTML = data.current.temp_c + '°C';
      humid.innerHTML = data.current.humidity + '%';
      wind.innerHTML = data.current.wind_kph + 'KM';
      rain.innerHTML = data.current.cloud + '%';
    })
}
