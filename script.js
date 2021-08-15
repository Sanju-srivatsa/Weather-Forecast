// https://api.openweathermap.org/data/2.5/weather?lat=55.755826&lon=37.6173&appid=6b15b60da310b5a09fbfd4351e46974f

//Select Elements
const  iconElement = document.querySelector('.weather-icon');
const  tempElement = document.querySelector('.temperature-value p');
const  descElement = document.querySelector('.temperature-description p');
const  locationElement = document.querySelector('.location p');
const  notificationElement = document.querySelector('.notification');

//App data
const weather = {}

weather.temperature ={
  unit : "celsius"
}

//APP CONSTS AND VARS
const KELVIN = 273;
//API key
const key = "6b15b60da310b5a09fbfd4351e46974f";  

if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>"
}

//set USER'S POSITION
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude; 

  getWeather(latitude, longitude);
}

//Error Message
function showError(error){
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

//Get weather from api server
function  getWeather(latitude, longitude){
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
      .then(function(response){
        let data = response.json();
        return data;
      })
      .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })
      .then(function(){
        displayWeather();
      })
}

//Display Weather to UI
function displayWeather(){
iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.iconId}@4x.png"/>`;
tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
descElement.innerHTML = weather.description;
locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

// Celsius to fahrenheit
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;  
}

//Clickable action on Temperature Element
tempElement.addEventListener("click",function(){
  if(weather.temperature.value === undefined) return;

  if(weather.temperature.unit == 'celsius'){
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = 'celsius';
  }
});
