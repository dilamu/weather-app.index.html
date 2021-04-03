function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let dayIndex = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day = days[dayIndex];
    return `${days[dayIndex]} ${hours}:${minutes}`;
}

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function showWeatherCondition(response) {
    // console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
        response.data.main.temp
    );

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;

    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );

    document.querySelector("#description").innerHTML =
        response.data.weather[0].description;
}

function searchCity(city) {
    let apiKey = "b2347491570b2c40e3677712ca14813f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
    event.preventDefault();

    let city = document.querySelector("#search-city-input").value;

    searchCity(city);
}

function searchForLocation(position) {
    let apiKey = "b2347491570b2c40e3677712ca14813f";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
    console.log(apiUrl);

    axios.get(apiUrl).then(showWeatherCondition);
}

function myLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchForLocation);
}

function convertFahrenheit(event) {
    event.preventDefault();
    let fahrenheitElement = document.querySelector("#fahrenheit-link");
    fahrenheitElement.innerHTML = 66;
}

function convertCelsius(event) {
    event.preventDefault();
    let celciusElement = document.querySelector("#celsius-link");
    celciusElement.innerHTML = 19;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", myLocation);

searchCity("New York City");
