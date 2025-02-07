// Отримати погоду за допомогою OpenWeatherMap API Опис: Використайте публічне API OpenWeatherMap для отримання поточної погоди. Зробіть GET-запит за адресою https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}, де {city} - назва міста, а {API_KEY} - ваш ключ API OpenWeatherMap. Перегляньте отримані дані щодо погоди.

// import { log } from "handlebars";
import templateWeather from "../templates/weather.hbs";

const getWeatherBtn = document.querySelector("#search-btn");
const getWeatherInput = document.querySelector("#city-input");
const weatherWrapper = document.querySelector(".weather-info");
const getSearchBox = document.querySelector(".search-box");

import mist from "../img/mistimg.png";
import clearDay from "../img/Day-Clear.png";
import cloudsDay from "../img/Day-Clouds.png";
import rainDay from "../img/Day-Rain.png";
import snowDay from "../img/Day-Snow.png";
import windDay from "../img/Day-wind.png";
import thunderstormDay from "../img/Day-Thunderstorm.png";
import drizzleDay from "../img/Day-Drizzle.png";
import clearNight from "../img/Night-Moon.png";
import cloudsNight from "../img/Night-Clouds.png";
import rainNight from "../img/Night-Rain.png";
import snowNight from "../img/Night-Snow.png";
import windNight from "../img/Night-Wind.png";
import thunderstormNight from "../img/Night-Storm.png";
import drizzleNight from "../img/Night-Drizzle.png";

// const weatherImages = {
//   clearDay: "./img/Day-Clear.png",
//   CloudsDay: "./Day-Clouds.png",
//   RainDay: "./img/Day-Rain.png",
//   SnowDay: "./img/Day-Snow.png",
//   WindDay: "./img/Day-wind.png",
//   ThunderstormDay: "./img/Day-Thunderstorm.png",
//   DrizzleDay: "./img/Day-Drizzle.png",
//   ClearNight: "./img/Night-Moon.png",
//   CloudsNight: "./img/Night-Clouds.png",
//   RainNight: "./img/Night-Rain.png",
//   SnowNight: "./img/Night-Snow.png",
//   WindNight: "./img/Night-Wind.png",
//   ThunderstormNight: "./img/Night-Storm.png",
//   DrizzleNight: "./img/Night-Drizzle.png",
// };

const weatherImages = {
  MistDay: mist,
  MistNight: mist,
  ClearDay: clearDay,
  CloudsDay: cloudsDay,
  RainDay: rainDay,
  SnowDay: snowDay,
  WindDay: windDay,
  ThunderstormDay: thunderstormDay,
  DrizzleDay: drizzleDay,
  ClearNight: clearNight,
  CloudsNight: cloudsNight,
  RainNight: rainNight,
  SnowNight: snowNight,
  WindNight: windNight,
  ThunderstormNight: thunderstormNight,
  DrizzleNight: drizzleNight,
};

getWeatherInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    weatherInfo();
  } 
});

getWeatherBtn.addEventListener("click", () => {
  weatherInfo();
});
const getWeatherByCity = (city) => {
  const params = new URLSearchParams({
    q: city,
    appid: "222f0dc73bf33f7ada4e997d217948b2",
    units: "metric",
  }).toString();

  return fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);
};

const weatherInfo = () => {
  getWeatherByCity(getWeatherInput.value.trim())
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getSearchBox.style.borderBottom = "1px solid #ddd";
      const timeDate = new Date();
      const info = {
        name: data.name,
        temp: data.main.temp,
        descr: data.weather[0].main,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      };
      if (timeDate.getHours() >= 20 || timeDate.getHours() < 4) {
        info.image = weatherImages[`${data.weather[0].main}Night`];
      } else {
        info.image = weatherImages[`${data.weather[0].main}Day`];
      }
      // }
      weatherWrapper.innerHTML = templateWeather(info);
      console.log(info);
      // console.log('remplateWeather:', templateWeather);
    })
    .catch((err) => {
      console.log(err);
      alert("Це місто не знайдено. Спробуйте ще раз!");
      getSearchBox.style.borderBottom = "none";
      getWeatherInput.value = "";
      weatherWrapper.innerHTML = "";
    });
};
