
const APIKey = "73cf3798e2aaae0e83f979c21b88cf8a";
const city = "London";
//const URL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd0c23ba43ed0ddab50f1ffd33aa9bdb';

$.getJSON(url, (data) => {
    console.log(data);
})

function init()
{
    $("#date").text();
}