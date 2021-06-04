
const APIKey = "578f47eee8961c9e26c7e6ace6d5004a";
const city = "Chisinau";
//const URL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;
const hourlyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=metric`;
// //http://openweathermap.org/img/wn/10d@2x.png

    var currentDate;

$.getJSON(url, (data) => {
    console.log(data);
     currentDate = new Date(data.sys.sunset*1000)
    $("#date").text(`${currentDate.toLocaleDateString('en-us', { weekday: 'long' })}, ${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`);
    let imgPath = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    $("#current-weather-image").attr("src",imgPath);
    $("#current-weather-text").text(data.weather[0].main);

    $("#current-weather-temp").text(Math.round(data.main.temp)+"°C")
    $("#current-weather-feel").text(`Real feel ${Math.round(data.main.feels_like)}°C`)

    let sunrise = new Date(data.sys.sunrise*1000);
    let sunset = new Date(data.sys.sunset*1000);
    let durHours = Math.floor((data.sys.sunset - data.sys.sunrise)/3600);
    let durMinutes = Math.floor(((data.sys.sunset - data.sys.sunrise)%3600)/60);
    //let duration =new Date(1000*data.sys.sunset - 1000*data.sys.sunrise);
    $("#current-weather-time-list li:eq(0)").text(`Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()}`)
    $("#current-weather-time-list li:eq(1)").text(`Sunset: ${sunset.getHours()}:${sunset.getMinutes()}`)
    $("#current-weather-time-list li:eq(2)").text(`Duration: ${durHours}:${durMinutes}`)
})

var hoursNumber = 6;

$.getJSON(hourlyUrl,(data) =>{
    console.log(data);
    $("#hourly-weather-day").append(currentDate.toLocaleDateString('en-us', { weekday: 'long' }))
    
  

    for(let i = 0; i < hoursNumber ; i++)
    {
            let hour = new Date (data.list[i].dt_txt);
            //ToLocaleString - for converting into AM-PM format
            $("#hourly-table-hour").append(`<td><p class = "text-center m-0">${hour.toLocaleString('en-US', { hour: 'numeric', hour12: true })}</p>
                                        <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"></img>
                                    </td>`);
          $("#hourly-table-forecast").append(`<td> <p class = "text-center m-0">${data.list[i].weather[0].main}</p> </td>`);
          $("#hourly-table-temp").append(`<td> <p class = "text-center m-0">${Math.round(data.list[i].main.temp)}°</p> </td>`);
          $("#hourly-table-feel").append(`<td> <p class = "text-center m-0">${Math.round(data.list[i].main.feels_like)}°</p> </td>`);
          $("#hourly-table-wind").append(`<td> <p class = "text-center m-0">${Math.round(data.list[i].wind.speed*3.6)} ${degToCard(data.list[i].wind.deg)}</p> </td>`);
            //speed is displayed in m/s probably, so multiply by 3.6 to get km/h, for direction I used the function degToCard
    
    }

    //$("#hourly-table-hour td p").css("width", `${$("#hourly-table-hour td img").css("width")}`); // set p width the same as img width
    //$("#hourly-table-forecast td p").css("width", `${$("#hourly-table-hour td img").css("width")}`);
    $("#hourly-table-hour td img").css("width", `${this.innerWidth/1536*100}`);//Image gets sized with the viewport - Ma mandresc cu linia asta :)
    //1536 era valoarea innerWidth a ecranului meu, pentru ca pe toate ecranele sa tina acelasi raport - ca sa lucreze bine si pentru
    //alte device-uri, ar trebui de dat scale si la font-size(dar asa el lucreaza  bine cu width 500+)
    $(".hourly-weather-table-row td p").css("width", `${$("#hourly-table-hour td img").css("width")}`); //set text width same as img width
})


var degToCard = function(deg){//Not my code but too lazy to turn degrees into cardinal direction
    if (deg>11.25 && deg<=33.75){
      return "NNE";
    }else if (deg>33.75 && deg<=56.25){
      return "ENE";
    }else if (deg>56.25 && deg<=78.75){
      return "E";
    }else if (deg>78.75 && deg<=101.25){
      return "ESE";
    }else if (deg>101.25 && deg<=123.75){
      return "ESE";
    }else if (deg>123.75 && deg<=146.25){
      return "SE";
    }else if (deg>146.25 && deg<=168.75){
      return "SSE";
    }else if (deg>168.75 && deg<=191.25){
      return "S";
    }else if (deg>191.25 && deg<=213.75){
      return "SSW";
    }else if (deg>213.75 && deg<=236.25){
      return "SW";
    }else if (deg>236.25 && deg<=258.75){
      return "WSW";
    }else if (deg>258.75 && deg<=281.25){
      return "W";
    }else if (deg>281.25 && deg<=303.75){
      return "WNW";
    }else if (deg>303.75 && deg<=326.25){
      return "NW";
    }else if (deg>326.25 && deg<=348.75){
      return "NNW";
    }else{
      return "N"; 
    }
  }