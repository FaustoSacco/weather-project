// Vanilla JS project spec
// Create a weather API website (or similar)
// Use the geolocation API to get the users location
// Use a free weather service to get weather data for the location
// This one is great: https://openweathermap.org/api and has many different sorts of data (you need to sign up for an API key)
// Render this data to the screen
// Make it look nice and/or have a nice/original theme

// Examples:
// https://taps-aff.co.uk/london/
// https://www.bbc.com/weather/2643743

let divHtml = document.querySelector("#data-dump");
const button = document.querySelector("#weather-activate");

const apiKey = "626f8543947f34b5d0f931ad4b7954ca";

function getLocation() {
  // set html to loading
  divHtml.innerHTML = `<div class="current-weather">
  <p class="loading">Loading</p></div>`;

  // if the browser navigator exists do this
  if (navigator.geolocation) {
    // get user co-ordinates
    navigator.geolocation.getCurrentPosition((position) => {
      // store user co-ordinates into weather api url
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;

      // fetch weather information
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // set html with weather api data
          divHtml.innerHTML = `
          <div class="current-weather">
          <h3 class="header">Today: ${new Date().toDateString()} in ${
            data.name
          }</h3>

          <p class="status">Current weather status: ${
            data.weather[0].description
          }</p>

          <p class="humidity">humidity: ${data.main.humidity}</p>
          <p class="pressure">pressure: ${data.main.pressure}</p>
          <p class="temp">temperature: ${data.main.temp}</p>
          </div>
         `;
        });
    });
  } else {
    // if it doesn't exist, set html to a user message
    divHtml.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// add event listener to button
button.addEventListener("click", getLocation);
