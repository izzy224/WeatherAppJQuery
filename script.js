
const APIKey = "578f47eee8961c9e26c7e6ace6d5004a";
const city = "London";
//const URL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
//http://openweathermap.org/img/wn/10d@2x.png


$.getJSON(url, (data) => {
    console.log(data);
    $("#date").text(data);
})

function init()
{

}