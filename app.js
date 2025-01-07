let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let weatherForecast = document.querySelector(".weather_forecast");
let weatherIcon = document.querySelector(".weather_icon");
let temperature = document.querySelector(".weather_temperature");
let weatherMin = document.querySelector(".weather_min");
let weatherMax = document.querySelector(".weather_max");

let feelslike = document.querySelector(".weather_feelslike");

let weatherHumidity = document.querySelector(".weather_humidity");
let weatherWind = document.querySelector(".weather_wind");
let weatherPressure = document.querySelector(".weather_pressure");

let citysearchbox = document.querySelector(".weather_search");

const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  console.log(curDate);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city = "hyderabad";

// Search for the city

citysearchbox.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityName = document.querySelector(".city-name");
  console.log(cityName.value);
  city = cityName.value;
  getWeatherData();
  cityName.value = "";
});

const getWeatherData = async () => {
  const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=797a715ec2165af38b151b796f11b16d`;

  try {
    const res = await fetch(weatherurl);
    const data = await res.json();
    console.log(data);
    const { main, name, weather, wind, sys, dt } = data;
    cityName.innerHTML = `${name},${getCountryName(sys.country)}`;

    weatherForecast.innerHTML = weather[0].main;
    weatherIcon.innerHTML = `<img src=" https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="imgage" />`;

    dateTime.innerHTML = getDateTime(dt);
    weatherForecast.innerHTML = `${main.temp}&#176`;
    weatherMin.innerHTML = `Min :${main.temp_min.toFixed()}&#176`;
    weatherMax.innerHTML = `Max :${main.temp_max.toFixed()}&#176`;
    feelslike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
    weatherHumidity.innerHTML = `${main.humidity}%`;
    weatherWind.innerHTML = `${wind.speed}m/s`;
    weatherPressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};

document.body.addEventListener("load", getWeatherData());
