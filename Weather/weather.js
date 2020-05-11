import * as key from "./key.js"

function addData (day, weatherRecord, time) {

    if(time==0)
        var temp = day['temp']['day']
    else {
        var temp = day['temp']
    }

    temp = Math.round(temp)
    var date = Math.round(day['dt'])
    var desc = day['weather'][0]['main']
    var humidity = day['humidity']
    var wind = parseInt(day['wind_speed']).toFixed().toString();

    weatherRecord.push({date,temp,desc,humidity,wind})
}

const getForecast = async (weatherUrl, weatherRecord) => {

    var request = new Request(weatherUrl);
        
    await fetch(request).then(function(response) {
        return response.text();
    }).then(function(text) {
        
        //console.log(JSON.parse(text))
        var res = JSON.parse(text)['daily'];

        res.forEach(day => {
            addData(day,weatherRecord,0);
        });

    }).catch ((e) => {
        throw new Error("Currently Service is Unavailable");
    });
}


async function getPastData (weatherRecord,lat,long) {

    var epochDay = 60*60*24;
    var currentEpoch = (new Date()).getTime();
    currentEpoch = Math.round(currentEpoch/1000);
    currentEpoch -= 6*epochDay ;
    
    //console.log(currentEpoch)

    for(var i=0;i<5;i++) {
        currentEpoch += epochDay;
        var pastWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat="+lat+"&lon="+long+"&units=metric&dt="+currentEpoch+"&appid="+key.openWeatherApiToken;
        var request = new Request(pastWeatherUrl);

        await fetch(request).then(function(response) {
            return response.text();
        }).then(function(text) {
            
            var res = JSON.parse(text)['current'];
    
            addData(res,weatherRecord,1)
    
        }).catch ((e) => {
            throw new Error("Currently Service is Unavailable");
        });
    }

}

async function getWeather (lat, long) {

    var weatherRecord = [];

    await getPastData(weatherRecord,lat,long)
    .then( () => {
        //console.log(weatherRecord)
    }).catch ((e) => {
        throw new Error(e);
    });

    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&units=metric&exclude=hourly,currently&appid="+key.openWeatherApiToken;

    await getForecast(forecastUrl, weatherRecord)
    .then( () => {
        //console.log(weatherRecord)
    }).catch ((e) => {
        throw new Error(e);
    });

    return weatherRecord

}


export {getWeather}