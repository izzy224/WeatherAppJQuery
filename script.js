
const APIKey = "578f47eee8961c9e26c7e6ace6d5004a";
const city = "Chisinau";
//const URL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
// const hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${APIKey}&units=metric`;
// //http://openweathermap.org/img/wn/10d@2x.png


$.getJSON(url, (data) => {
    console.log(data);
    let currentDate = new Date(data.sys.sunset*1000)
    $("#date").text(`${currentDate.toLocaleDateString('en-us', { weekday: 'long' })}, ${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`);
    let imgPath = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    $("#current-weather-image").attr("src",imgPath);
    $("#current-weather-text").text(data.weather[0].description);

    $("#current-weather-temp").text(Math.round(data.main.temp)+"°C")
    $("#current-weather-feel").text(`Real feel ${Math.round(data.main.feels_like)}°C`)

    let sunrise = new Date(data.sys.sunrise*1000);
    let sunset = new Date(data.sys.sunset*1000);
    let duration =new Date(1000*(data.sys.sunset-data.sys.sunrise));
    $("#current-weather-time-list li:eq(0)").text(`Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()}`)
    $("#current-weather-time-list li:eq(1)").text(`Sunset: ${sunset.getHours()}:${sunset.getMinutes()}`)
    $("#current-weather-time-list li:eq(2)").text(`Duration: ${duration.getHours()}:${duration.getMinutes()}`)
})

// $.getJSON(hourlyUrl,(data) =>{
//     console.log(data);
// })