$("#five-day-forecast").toggle();
function fiveDay()
{
    //First tab, all 5 days display forecast
    $.getJSON(dailyUrl,(data) =>{
        $("#five-day-daily-list").html("");
        console.log(data);
        for(let i=0; i<5; i++)
        {
            let dateTime = new Date(data.data[i].valid_date);
            console.log(dateTime);
            $("#five-day-daily-list").append(
            `<li class="w-20 h-100 text-center">
                <h5>${i==0 ? "Today" : dateTime.toLocaleDateString("en-UK", { weekday: 'short' }).toUpperCase()}</h5>
                <p>${dateTime.toLocaleDateString("en-US", {month: 'short', day: '2-digit'}).toUpperCase()}</p>
                <img src="https://www.weatherbit.io/static/img/icons/${data.data[i].weather.icon}.png"></img>
                <h4>${Math.round(data.data[i].temp)}°C</h3> 
                <p class = "text-wrap">${data.data[i].weather.description}</p>  
            </li>`)
        }
    })

}


$("#five-day-button").on("click",() =>
{ 
    fiveDay();
    $("#five-day-forecast").toggle();
    $("#today").toggle();
    $("#five-day-button").attr("disabled",true);
    $("#today-button").attr("disabled",false);

});