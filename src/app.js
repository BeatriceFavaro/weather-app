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


function displayForecast() {
let forecastElement = document.querySelector("#forecast");

let days = ["Thu", "Fri", "Sat","Sun", "Mon"]; 

let forecastHTML = "";
days.forEach(function (day) {
  forecastHTML = 
    forecastHTML + 
    `
      <div class="col-sm-2"> 
        <div class="card text-center">
          <div class="card-body next-five-days">
            <div class="next-five-days-day">${day}</div> 
              <img 
              src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
              alt=""
              class="next-five-days-image">  

              <div class="weather-forecast-temperature">  
                  <span class="weather-forecast-temperature-max">18°</span>  
                  <span class="weather-forecast-temperature-min">11°</span>
              </div>
            </div>
          </div>
        </div>       
      </div>  
    `;   
});
forecastHTML = forecastHTML + `</div>`; 
forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);
}



function displayWeatherCondition(response) {
celsiusTemperature = response.data.main.temp;
document.querySelector("#entered-city").innerHTML = response.data.name; 
document.querySelector("#daily-temperature").innerHTML = Math.round(celsiusTemperature); 
document.querySelector("#humidity").innerHTML = response.data.main.humidity; 
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#low").innerHTML = Math.round(response.data.main.temp_min);
document.querySelector("#high").innerHTML = Math.round(response.data.main.temp_max);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
//document.querySelector("#footer").innerHTML = response.data.weather[0].main;

iconElement = document.querySelector("#icon")
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`); 
console.log(response.data); 

getForecast(response.data.coord);
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "c45931ea5b2d65475fc4e704a2ae7306";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metrics;`
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast); 
}




https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


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
  
  //let footer = document.querySelector("#footer")
  //let description = document.querySelector("#description")

  
  //if (description === "sunny" || div.description === "clear") {
//    footer.innerHTML = `Enjoy some sunny hits ${card-link}`;
//  } else { if 
  //  (description === "clouds") {
    //  footer.innerHTML = `Enjoy some rainy hits ${card-link}`;
    //}  
  //}


//next five days 

//function displayForecast(response){
//  console.log(response)
//}

//function searchCity(city){ 
//let apiKey = "c45931ea5b2d65475fc4e704a2ae7306";
//let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
//axios.get(apiUrlForecast).then(displayForecast);
//}
