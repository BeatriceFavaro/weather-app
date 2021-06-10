// week 4, challenge 1
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
formatDateTime.innerHTML = `${day},  ${month}  ${date},  ${year} at ${hours}:${minutes}`;


//next five days 

//function displayForecast(response){
//  console.log(response)
//}

//function searchCity(city){ 
//let apiKey = "c45931ea5b2d65475fc4e704a2ae7306";
//let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
//axios.get(apiUrlForecast).then(displayForecast);
//}




// week 4, challenge 2
function displayWeatherCondition(response) {
document.querySelector("#entered-city").innerHTML = response.data.name; 
document.querySelector("#daily-temperature").innerHTML = Math.round(response.data.main.temp); 
document.querySelector("#humidity").innerHTML = response.data.main.humidity; 
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#low").innerHTML = Math.round(response.data.main.temp_min);
document.querySelector("#high").innerHTML = Math.round(response.data.main.temp_max);
document.querySelector("#description").innerHTML = response.data.weather[0].main;
//document.querySelector("#footer").innerHTML = response.data.weather[0].main;

}


console.log("apiUrl");


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



//5

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




// week 4, challenge 3
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#daily-temperature");
  let dailyTemperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 66;
  }
  
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#daily-temperature");
    let dailyTemperature = temperatureElement.innerHTML;
    temperatureElement.innerHTML = 16;
    }
  
  
  let farenheit = document.querySelector("#farenheit");
  farenheit.addEventListener("click", convertToFarenheit);
  
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

