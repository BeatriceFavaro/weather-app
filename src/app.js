let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay(days)];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}

let formatDateTime = document.querySelector("#date-time");
formatDateTime.innerHTML = `Last update: ${day},  ${month}  ${date},  ${year} at ${hours}:${minutes}`;


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000)
  let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return days[day];
}

function displayForecast(response) {

  let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = "";
forecast.forEach(function (forecastDay, index) {
  if (index < 5) {
  forecastHTML = 
    forecastHTML + 
    `
      <div class="col-sm-2 center-row"> 
        <div class="card text-center">
          <div class="card-body next-five-days" id="forecast-card">
            <div class="next-five-days-day">${formatDay(forecastDay.dt)}</div> 
              <img 
              src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt=""
              class="next-five-days-image">  

              <div class="weather-forecast-temperature">  
                  <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>  
                  <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>
            </div>
          </div>
        </div>       
      </div>  
    `;  } 
});
forecastHTML = forecastHTML + `</div>`; 
forecastElement.innerHTML = forecastHTML;
//console.log(forecastHTML);

}

function getForecast(coordinates){
  //console.log(coordinates);
  let apiKey = "c45931ea5b2d65475fc4e704a2ae7306";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast); 
}

function displayWeatherCondition(response) {
celsiusTemperature = response.data.main.temp;
document.querySelector("#entered-city").innerHTML = response.data.name; 
document.querySelector("#daily-temperature").innerHTML = Math.round(celsiusTemperature); 
document.querySelector("#humidity").innerHTML = response.data.main.humidity; 
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
//document.querySelector("#footer").innerHTML = response.data.weather[0].main;

let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`); 
//console.log(response.data); 

getForecast(response.data.coord);

//displayOnFooter(response.data.weather[0].description);
}


//function displayOnFooter(response) {
  //console.log(response);
  
  //let enjoy = document.querySelector("#enjoy"); 
  //let description = document.querySelector("#description")
  //if (description === "sunny" || div.description === "clear") {
    //enjoy.innerHTML = `Enjoy some sunny hits ${card-link}`;
  //} else { if 
  //(description === "clouds") {
  //enjoy.innerHTML = `Enjoy some rainy hits ${card-link}`;
    //}  
  //}

//}  





//why is this here?
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


function searchCity(city){
  let apiKey = "c45931ea5b2d65475fc4e704a2ae7306";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
  axios.get(apiUrl).then(displayWeatherCondition);
 }


searchCity("Venice")

function typeCityName(event) {
event.preventDefault();
let city = document.querySelector("#query").value;
searchCity(city); 
}


let city = document.querySelector("#find-city");
city.addEventListener("submit", typeCityName);



function searchLocation(position){
  let apiKey = "c45931ea5b2d65475fc4e704a2ae7306";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentCity)




function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#daily-temperature");
  celsius.classList.remove("active"); 
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#daily-temperature");
    celsius.classList.add("active"); 
    fahrenheit.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    }
  
  let celsiusTemperature = null; 
  
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", convertToFahrenheit);
  
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", convertToCelsius);

  
  

  //6 

//next five days 

//function displayForecast(response){
//  console.log(response)
//}

//function searchCity(city){ 
//let apiKey = "c45931ea5b2d65475fc4e704a2ae7306";
//let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
//axios.get(apiUrlForecast).then(displayForecast);
//}


