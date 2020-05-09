import * as weather from "./weather.js"
import * as map from "./geocode.js"

var flex = document.getElementById("flex");
var result = document.getElementById("result");
var box = flex.getElementsByClassName("box");
var locationInput = document.getElementById("location");
var searchButton = document.getElementById("searchButton");
var loader = document.getElementById("loader");
var leftSlide = document.getElementById("leftslide");
var rightSlide = document.getElementById("rightslide");

var flag = 0;
var weatherLocation = "Delhi";
var boxNumber = 6;
var relativeDate = 5;
var todayDate = 5;
var weatherData;
const imgLoc = "res/image_back/";

const weatherImage = {
    clouds:1,
    rain:1,
    clear:1,
    thunderstrom:1,
    snow:1,
    tornado:1,
    drizzle:1,
    haze:1,
}


setTodayDate();
getDate(1588578)


function restoreProperty(k) {
    var noBoxes = box.length;

    var scaleFactor = 0.3;
    var zIndexFactor = 1;
    var marginFactor = -2;
    var blurFactor = -1;

    var scale = 1;
    var zIndex = 1;
    var margin = 4;
    var blur = -1 * (parseInt(noBoxes / 2) * blurFactor);




    for (var i = 0; i < noBoxes; i++) {

        var index = i - k;
        // console.log(i,index,scale,zIndex,margin,blur,noBoxes/2)

        if (index >= 0 && index < noBoxes) {
            box[index].style.transform = "scale(" + scale + ")";
            box[index].style.zIndex = "" + zIndex;
            box[index].style.margin = "-" + margin + "%";
            box[index].style.filter = "blur(" + blur + "px)";
        }

        if (i < parseInt(noBoxes / 2)) {
            scale += scaleFactor;
            zIndex += zIndexFactor;
            margin += marginFactor;
            blur += blurFactor;
        } else {
            scale -= scaleFactor;
            zIndex -= zIndexFactor;
            margin -= marginFactor;
            blur -= blurFactor;
        }
    }
}



function setTodayDate() {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var today = new Date();
    var dateHeader = document.getElementById('date');

    var day = weekday[today.getDay()];
    var date = today.getDate() + "th " + monthNames[today.getMonth()]
    console.log(dateHeader)
    dateHeader.innerHTML = "<strong>" + day + "</strong></strong>, " + date;
}

async function getDate(dt) {
    var utcSeconds = dt;
    var date = new Date(0);
    date.setUTCSeconds(utcSeconds);

    var dateArray = date.toString().split(" ");

    var dateString = dateArray[2] + "th, " + dateArray[1];

    // console.log(dt)
    // console.log(date)
    // console.log(dateArray)
    // console.log(dateString)
    return dateString;
}

async function getBox(day, date) {

    var currentDay;

    if (date == todayDate) {
        currentDay = "Today";
    } else if (date == todayDate - 1) {
        currentDay = "Yesterday"
    } else if (date == todayDate + 1) {
        currentDay = "Tomorrow"
    } else {
        currentDay = await getDate(day['date']);
    }

    var imgPath = imgLoc;
    var desc = day['desc'].toLowerCase();
    
    console.log(desc, weatherImage[desc])

    if(weatherImage[desc] == 1) {
        imgPath += desc+".jpg";
    }
    else {
        imgPath += "weather.jpg";
    }
    console.log(imgPath)


    var divString = `<div class="box" style="background-image: url(${imgPath});">
                        <div class="weather-date box-item">${currentDay}</div>
                        <div class="temp-desc box-item">
                            <div class="temp">&nbsp;${day['temp']}<sup>o</sup></div>
                            <div class="desc">${day['desc']}</div>
                        </div>
                        <div class="humid detail box-item">
                            <div class="detail-name">Humidity</div>
                            <div class="detail-value">${day['humidity']}%</div>
                        </div>
                        <div class="sep-line">|</div>
                        <div class="wind detail box-item">
                            <div class="detail-name">Wind</div>
                            <div class="detail-value">${day['wind']} m/hr</div>
                        </div>
                    </div>`;

    return divString;
}


function deleteBox(k) {
    if (flag == 1) {
        return;
    }

    flag = 1;
    console.log(box)
    if(relativeDate - k <= 0) {
        leftSlide.style.visibility = "hidden";
    }
    else {
        leftSlide.style.visibility = "visible";
    }

    if(relativeDate - k >= weatherData.length - 1) {
        rightSlide.style.visibility = "hidden";
    }
    else {
        rightSlide.style.visibility = "visible";
    }
    var index = 0;
    var animations = ["left_animation", "right_animation"];

    if (k == -1) {
        index = 0;
        var removeTarget = box[index];
    } else {
        index = box.length - 1;
    }


    var removeTarget = box[index];
    restoreProperty(k)
    flex.classList.toggle(animations[(index == 0) ? 0 : 1]);


    removeTarget.style.opacity = "0";
    removeTarget.style.transform = "scale(0.75)";


    setTimeout(async function () {

        removeTarget.parentNode.removeChild(removeTarget);
        flex.classList.toggle(animations[(index == 0) ? 0 : 1]);

        var boxDate = relativeDate - (k * Math.round(boxNumber / 2));

        if(boxDate >= weatherData.length || boxDate < 0) {

            var div =  '<div class="box" style="opacity: 0; transition: opacity 0s !important;">Data Exceeded</div>';

            if(k==-1) {
                flex.innerHTML += div;
                relativeDate++;
            }
            else {
                flex.innerHTML = div + flex.innerHTML;
                relativeDate--;
            }
        }
        else {
            if (k == -1) {
                flex.innerHTML += await getBox(weatherData[boxDate], boxDate);
                relativeDate++;
    
            } else {
                flex.innerHTML = await getBox(weatherData[boxDate], boxDate) + flex.innerHTML;
                relativeDate--;
            }

            var newIndex = box.length - 1 - index;
            box[newIndex].classList.toggle("apply_opacity")
            setTimeout(function () {
                box[newIndex].classList.toggle("apply_opacity")
            }, 250);
        }

        
        console.log(relativeDate, relativeDate - Math.round(boxNumber / 2),relativeDate + Math.round(boxNumber / 2))

        


        restoreProperty(0)
        console.log(flex)

        flag = 0;
    }, 1000);
}


searchButton.addEventListener("click", async () => {

    var searchedLocation = locationInput.value;

    if (searchedLocation == "") {
        return alert("Please Enter a location")
    }

    setTimeout(() => flex.style.opacity = "0", 200);
    result.style.display = "none";
    loader.style.display = "flex";
    setTimeout(() => loader.style.opacity = "1", 200);

    console.log(searchedLocation)

    map.getCoordinates(searchedLocation)
        .then(async (locationDetail) => {
            weatherLocation = locationDetail.location;
            locationInput.value = weatherLocation;

            return await weather.getWeather(locationDetail.latitude, locationDetail.longitude);

        }).then(async (weatherRecord) => {
            console.log(weatherRecord)
            weatherData = weatherRecord;
            var div = "";
            for (var i = boxNumber - 3; i < boxNumber + 2; i++) {
                div += await getBox(weatherRecord[i], i);
            }

            // console.log(div);


            flex.innerHTML = div;
            restoreProperty(0);

            setTimeout(() => loader.style.opacity = "0", 200);
            loader.style.display = "none";
            result.style.display = "flex";
            setTimeout(() => flex.style.opacity = "1", 200);


        }).catch((message) => {
            setTimeout(() => loader.style.opacity = "0", 200);
            loader.style.display = "none";
            alert(message)
        });


})

leftSlide.addEventListener("click", () => deleteBox(1));
rightSlide.addEventListener("click", () => deleteBox(-1));