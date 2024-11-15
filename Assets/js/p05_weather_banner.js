//Workaround for .ENV File
import ENV from '../../dotEnv.js';


//Quick access to the important Elements
const temp = document.querySelector(".weather_temperature");
const loc = document.querySelector(".weather_location");
const condition = document.querySelector(".weather_condition");

//Variable to store the fetched data
let weatherData = null;

//Secret Keys and Coordinates from my fake .ENV File
const APIKey = ENV.WEATHER_API_KEY;
const locLAT = ENV.WEATHER_LOC_LAT;
const locLET = ENV.WEATHER_LOC_LET;

//Fetch Date from openweathermapAPI and change the content of the elements
async function getWeatherData() {

    //Infinite Loop                                                                                                     noinspection InfiniteLoopJS
    while (true) {
        //Use axios Library to fetch Data
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locLAT}&lon=${locLET}&appid=${APIKey}`)
            .then((response) => {
                weatherData = response.data;
                //set location
                loc.textContent = `${weatherData.name},`;
                //set temperature
                temp.textContent = `${(Number(weatherData.main.temp) - 273.15).toFixed(1)}°C,`
                //set condition Icon depending on weather
                let cond = weatherData.weather[0].main;
                switch (cond) {
                    case "Clear":
                        removeActive();
                        setActive("sun")
                        break;
                    case "Rain":
                        removeActive()
                        setActive("rain")
                        break;
                    case "Thunderstorm":
                        removeActive()
                        setActive("storm")
                        break;
                    case "Snow":
                        removeActive()
                        setActive("snow")
                        break;
                    case "Atmosphere":
                        removeActive()
                        setActive("fog")
                        break;
                    case "Cloud":
                        removeActive()
                        setActive("cloud")
                        break;
                    default:
                        console.error("Unknown weather data");
                }
                condition.textContent = `${cond}`;
            })
            .catch((error) => {
                console.log(error);
            })
        //Wait 10minutes and then update the data.
        await new Promise(resolve => setTimeout(resolve, 600000));
    }
}

//remove the activeIcon class-tag from all elements with it
function removeActive() {
    document.querySelectorAll(".weather_icon.activeIcon").forEach(el => {
        el.classList.remove("activeIcon");
    });
}
//adds the activeIcon to the element matching the condition
function setActive(condi) {
    document.querySelector(`.${condi}`).classList.add("activeIcon");
}

//start the loop
getWeatherData();




