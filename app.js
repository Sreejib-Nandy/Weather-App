const apiKey = "c1133cf38f916fe52abe89d8919efad4"; //Use your personal APIKEY
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid="; //Openweather API URL
const searchCity = document.querySelector(".input");
const searchBtn = document.querySelector(".search");

async function getWeather(place) {
  // getweather function returns promise so don't forget to use async-await
  let URL = apiURL + apiKey + `&q=${place}`; // The Entire URL (use units=metric to get temperature in celcius)
  let response = await fetch(URL);
  let data = await response.json(); // Converting XML to JSON to read the data
  if (data.cod === "404") {
    // Incase of 404 Error
    document.querySelector(".display").style.display = "none";
    document.querySelector(".blank").style.display = "none";
    document.querySelector(".error-404").style.display = "block";
  }
  let weatherImg = document.querySelector(".weather-img"); // Changing the Display Image (weather description)
  weatherImg.src = `${data.weather[0].main}.png`;
  document.querySelector("#condition").innerHTML = String(
    data.weather[0].description
  ).toUpperCase();
  document.querySelector("#temp").innerHTML = data.main.temp + " &degC"; // Showing the Temperature
  document.querySelector("#place").innerHTML = data.name;
  let sunriseTimestamp = data.sys.sunrise * 1000; // Sunrise Timestamp to Human Readable Time
  document.querySelector("#sunrise").innerHTML =
    timestamptoTime(sunriseTimestamp);
  // Showing the Co-ordinate of the place
  document.querySelector(".cordinates").children[0].textContent =
    "lat : " + Number(`${data.coord.lat}`).toFixed(2) + " °";
  document.querySelector(".cordinates").children[1].textContent =
    "lon : " + Number(`${data.coord.lon}`).toFixed(2) + " °";
  let sunsetTimestamp = data.sys.sunset * 1000; // Sunset Timestamp to Human Readable Time
  document.querySelector("#sunset").innerHTML =
    timestamptoTime(sunsetTimestamp);
  // Showing More Informations
  document.querySelector("#pressure").innerHTML =
    `${data.main.pressure}` + " mb";
  document.querySelector("#humidity").innerHTML =
    `${data.main.humidity}` + " %";
  document.querySelector("#wind").innerHTML = `${data.wind.speed}` + " km/hr";
}
// Function for changing Timestamp to Real Time
function timestamptoTime(Time) {
  let calculation = new Date(Time);
  let actualTime = `${String(calculation.getHours()).padStart(
    "2",
    "0"
  )} : ${String(calculation.getMinutes()).padStart("2", "0")}`;
  return actualTime;
}
// Click Event to search weather through API
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchCity.value !== "") {
    getWeather(searchCity.value);
    document.querySelector(".display").style.display = "flex";
    document.querySelector(".blank").style.display = "none";
    document.querySelector(".error-404").style.display = "none";
  }
});
// Enter Event to search weather through API
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && searchCity.value !== "") {
    getWeather(searchCity.value);
    document.querySelector(".display").style.display = "flex";
    document.querySelector(".blank").style.display = "none";
    document.querySelector(".error-404").style.display = "none";
  } else if (searchCity.value === "") {
    document.querySelector(".display").style.display = "none";
    document.querySelector(".blank").style.display = "block";
    document.querySelector(".error-404").style.display = "none";
  }
});
// Load Event to display Initial Page
window.addEventListener("load", (e) => {
  e.preventDefault();
  document.querySelector(".display").style.display = "none";
  document.querySelector(".blank").style.display = "block";
  document.querySelector(".error-404").style.display = "none";
});

// This is not RESPONSIVE on small devices but behaves well on big screen
// END //
