const apiKey = "94b3ea850139bdda06173b8f01e4cd9f";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

const cityBox = document.querySelector(".search input");
const citybtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const unitToggle = document.querySelector(".unit-toggle");

let isCelsius = true;

async function checkWeather(city = "vadodara") {
    try {
        const response = await fetch(apiUrl + city);
        const data = await response.json();

        if (data.cod === "404") {
            throw new Error("City not found");
        }

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        updateTemperature(data.main.temp);
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main) {
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        alert("Error: City not found or an issue occurred.");
    }
}

function updateTemperature(tempCelsius) {
    const temp = isCelsius ? Math.round(tempCelsius) + "°C" : convertCelsiusToFahrenheit(tempCelsius) + "°F";
    tempElement.innerHTML = temp;
}

function convertCelsiusToFahrenheit(tempCelsius) {
    return Math.round((tempCelsius * 9/5) + 32);
}

citybtn.addEventListener("click", () => {
    const city = cityBox.value.trim();
    if (city) checkWeather(city);
    else console.error("Please enter a city");
});

cityBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const city = cityBox.value.trim();
        if (city) checkWeather(city);
        else console.error("Please enter a city");
    }
});

unitToggle.addEventListener("click", () => {
    isCelsius = !isCelsius;
    const city = cityBox.value.trim();
    if (city) checkWeather(city);
});

document.addEventListener("DOMContentLoaded", async () => {
    const defaultCity = "vadodara";
    await checkWeather(defaultCity);
    cityBox.value = defaultCity;
});
