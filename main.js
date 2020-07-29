const oneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=47.685&lon=16.5905&units=metric&appid=';
const week = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function passKey() {
    let key = $("#apiKey").val();
    loadData(key);
}

function loadData(key) {
    fetch(oneCall + key)
        .then(resp => resp.json())
        .then(data => createForecast(data))
        .catch(err => console.error("MY_msg: " + err));
}

function createForecast(x) {
    console.log(x);
    $("#city").text("SOPRON");
    $("#lat").text("Lat = " + x.lat);
    $("#lon").text("Lon = " + x.lon);
    createHourly(x.hourly);
};

function createHourly(hourlyData) {
    let dateOld = false;
    let colorChange = false;
    let stripesOn = false;
    
    for (let i = 0; i < hourlyData.length; i++) {
        let day = new Date(hourlyData[i].dt * 1000);
        let date = day.getDate();
        date != dateOld ? colorChange = true : colorChange = false;
        if (colorChange) { stripesOn = !stripesOn }
        dateOld = date;
        let hour = day.getHours();
        hour.toString().length == 1 ? hour = "0" + hour : hour;

        displayTime("#day", week[day.getDay()], stripesOn, "#day span:last", "day", i, "gainsboro", "palegoldenrod");
        displayTime("#date", date, stripesOn, "#date span:last", "date", i, "gainsboro", "palegoldenrod");
        displayTime("#hour", hour, stripesOn, "#hour span:last", "hour", i, "whitesmoke", "whitesmoke");
        displayTemperature(hourlyData[i], i);
        displayWindSpeed(hourlyData[i], i);
        displayWindDirection(hourlyData[i], i);
        displayClouds(hourlyData[i], i);
        displayRain(hourlyData[i], i);
        displaySandbox(i);
    }
}

function displayTime(timeId, data, isOn, spanSelector, time, j, satColor, lightColor) {
    $(timeId).append("<span> " + data + " </span>")
    isOn ?
        $(spanSelector).attr("id", time + j).css("background-color", satColor) :
        $(spanSelector).attr("id", time + j).css("background-color", lightColor);
}

function displayTemperature(a, j) {
    let temperature = Math.round(a.temp);
    let tempNorm = temperature + 40;
    let Red = Math.min(255, (tempNorm * 5));
    let Green = Math.min(255, ((45 - Math.abs(45 - tempNorm)) * 7));
    let Blue = Math.max(0, ((90 - tempNorm) * 4));
    $("#temperature").append("<span> " + temperature + " </span>")
    $("#temperature span:last")
        .attr("id", "t" + j)
        .css("background-color", "rgb(" + Red + ", " + Green + ", " + Blue + ")");
}

function displayWindSpeed(a, j) {
    let windSpeed = Math.round(a.wind_speed);
    let Red = Math.max(160, Math.min(255, 255 - (windSpeed * 11)));
    let Green = Math.max(0, Math.min(255, 550 - (windSpeed * 11)));
    let Blue = Math.max(70, Math.min(255, 400 - (windSpeed * 11)));
    $("#wind-speed").append("<span> " + windSpeed + " </span>")
    $("#wind-speed span:last")
        .attr("id", "w" + j)
        .css("background-color", "rgb(" + Red + ", " + Green + ", " + Blue + ")");
}

function displayWindDirection(a, j) {
    let windDirection = 180 + a.wind_deg;
    $("#wind-direction").append("<span> <i class='fa fa-long-arrow-up'></i></span>")
    $("#wind-direction i:last")
        .attr("id", "wd" + j)
        .css("transform", "rotate(" + windDirection + "deg)")
}

function displayClouds(a, j) {
    let clouds = a.clouds;
    let RGB = Math.max(0, Math.min(255, 255 - clouds * 1.5));
    $("#clouds").append("<span> " + clouds + " </span>")
    $("#clouds span:last")
        .attr("id", "c" + j)
        .css("background-color", "rgb(" + RGB + ", " + RGB + ", " + RGB + ")");
}

function displayRain(a, j) {
    let rain = Math.round(a.pop * 100);
    let Red = Math.max(0, Math.min(255, 255 - rain * 2.0));
    $("#rain").append("<span> " + rain + " </span>")
    $("#rain span:last")
        .attr("id", "r" + j)
        .css("background-color", "rgb(" + Red + ", " + 240 + ", " + 240 + ")");
}

// for colour palette testing
function displaySandbox(j) {
    // let Red = Math.min(255, (j * 5));
    // let Green = Math.min(255, ((45 - Math.abs(45 - j)) * 7));
    // let Blue = Math.max(0, ((90 - j) * 4));
    let RGB = Math.max(0, Math.min(255, 255 - (j) * 1.7));
    $("#sandbox").append("<span> " + (j) + " </span>")
    $("#sandbox span:last")
        .attr("id", "s" + j)
        .css("background-color", "rgb(" + RGB + ", " + RGB + ", " + RGB + ")");
}