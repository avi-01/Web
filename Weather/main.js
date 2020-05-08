import * as key from "./key.js"

var flex = document.getElementById("flex");
var box = flex.getElementsByClassName("box");
var boxNumber = 6;


restoreProperty(0);
var flag = 0;
var searchLocation = "Delhi";
console.log(key.mapBoxApiToken)

function restoreProperty (k) {
    var noBoxes = box.length;

    var scaleFactor = 0.3;
    var zIndexFactor = 1;
    var marginFactor = -2;
    var blurFactor = -1;

    var scale = 1;
    var zIndex = 1;
    var margin = 4;
    var blur = -1*(parseInt(noBoxes/2)*blurFactor);




    for (var i = 0; i < noBoxes; i++) {
        
        var index = i - k;
        console.log(i,index,scale,zIndex,margin,blur,noBoxes/2)

        if(index >= 0 && index < noBoxes) {
            box[index].style.transform = "scale("+scale+")";
            box[index].style.zIndex = ""+zIndex;
            box[index].style.margin = "-"+margin+"%";
            box[index].style.filter = "blur("+blur+"px)";
        }

        if(i < parseInt(noBoxes/2)) {
            scale += scaleFactor;
            zIndex += zIndexFactor;
            margin += marginFactor;
            blur += blurFactor;
        } 

        else {
            scale -= scaleFactor;
            zIndex -= zIndexFactor;
            margin -= marginFactor;
            blur -= blurFactor;
        }
    }
}


function deleteBox (k) {
    if(flag==1) {
        return;
    }

    flag = 1;
    console.log(box)
    var index  = 0;
    var animations = ["left_animation","right_animation"];
    
    if (k == -1) {
        index = 0;
        var removeTarget = box[index];
    }

    else {
        index = box.length - 1;
    }


    var removeTarget = box[index];
    restoreProperty(k)
    flex.classList.toggle(animations[(index == 0) ? 0 : 1]);
    

    removeTarget.style.opacity = "0";
    removeTarget.style.transform = "scale(0.75)";
    

    setTimeout(function() {
        removeTarget.parentNode.removeChild(removeTarget);
        flex.classList.toggle(animations[(index == 0) ? 0 : 1]);

        if (k == -1) {
            flex.innerHTML += "<div class='box'>This is box"+boxNumber+"</div>"
        }
        else {
            flex.innerHTML = "<div class='box'>This is box"+boxNumber+"</div>" + flex.innerHTML;
        }
        boxNumber++;

        var newIndex = box.length - 1 - index;
        box[newIndex].classList.toggle("apply_opacity")
        setTimeout(function() { box[newIndex].classList.toggle("apply_opacity") }, 250);

        restoreProperty(0)
        console.log(flex)

        flag = 0;
    }, 1000);
}




