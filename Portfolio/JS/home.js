
console.log("home")

var home = document.getElementById('home');
var bigCircle = document.getElementById('bigCircle');

var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
var offsetRatio = 180/(pageWidth);

window.addEventListener("mousemove", (e) => {


    console.log("A " + pageWidth + " "  +  pageHeight + " " +offsetRatio + " " + (pageWidth/2 - e.pageX + pageHeight/2 - e.pageY))

    var initialRotate =(90 + (pageWidth/2 - e.pageX)*offsetRatio);

    console.log(e.pageX ,e.pageY,initialRotate);

    bigCircle.style.transform = "rotateZ("+ initialRotate +"deg)";

})