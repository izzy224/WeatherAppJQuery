var currentDate;
var hoursNumber = 6; //Number of hour positions displayed on page, 6 by standart
$("#today-button").attr("disabled",true);//Page by default starts on today forecast


function todayTab(){
  //Gets and prints current weather
$.getJSON(url, (data) => {
    console.log(data);
     currentDate = new Date(data.sys.sunset*1000)
    $("#date").text(`${currentDate.toLocaleDateString('en-us', { weekday: 'long' })}, ${currentDate.getDate()}.${currentDate.getMonth()+1}.${currentDate.getFullYear()}`);
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
    $("#current-weather-time-list li:eq(0)").text(`Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes() < 10 ? '0' : ''}${sunrise.getMinutes()}`)
    $("#current-weather-time-list li:eq(1)").text(`Sunset: ${sunset.getHours()}:${sunset.getMinutes() < 10 ? '0' : ''}${sunset.getMinutes()}`)
    $("#current-weather-time-list li:eq(2)").text(`Duration: ${durHours}:${durMinutes < 10 ? '0' : ''}${durMinutes}`)
})


  //Gets and prints hourly forecast
$.getJSON(hourlyUrl,(data) =>{
    console.log(data);
    hourlyData = data;

    //Clears out everything, in case of update
    $("#hourly-weather-day").html("");
    $("#hourly-table-hour td").html("");
    $("#hourly-table-forecast td").html("");
    $("#hourly-table-temp td").html("");
    $("#hourly-table-wind td").html("");
    $("#hourly-table-feel td").html("");   


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
    $("#hourly-table-hour td img").css("width", `${this.innerWidth/1536*100}`);
    //Image gets sized with the viewport - Ma mandresc cu linia asta :)
    //1536 era valoarea innerWidth a ecranului meu, pentru ca pe toate ecranele sa tina acelasi raport - ca sa lucreze bine si pentru
    //alte device-uri, ar trebui de dat scale si la font-size(dar asa el lucreaza  bine cu width 500+)
    $(".hourly-weather-table-row td p").css("width", `${$("#hourly-table-hour td img").css("width")}`); //set text width same as img width
})
}

   $("#today-button").on("click",() => {

    todayTab();
    $("#five-day-forecast").toggle();
    $("#today").toggle();
    $("#today-button").attr("disabled",true); 
    $("#five-day-button").attr("disabled",false);
  });


  todayTab();
