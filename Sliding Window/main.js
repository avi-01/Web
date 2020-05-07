var flex = document.getElementById("flex");

var box = flex.getElementsByClassName("box");


restoreProperty = function (k) {
    var scale = 1;
    var zIndex = 1;
    var margin = 4;
    var noBoxes = box.length;
    
    for (var i = 0; i < noBoxes; i++) {
        
        var index = i - k;
        console.log(i,index,scale,zIndex,margin,noBoxes/2)

        if(index >= 0 && index < noBoxes) {
            box[index].style.transform = "scale("+scale+")";
            box[index].style.zIndex = ""+zIndex;
            box[index].style.margin = "-"+margin+"%";
        }

        if(i == parseInt(noBoxes/2)) {
            scale -= 0.25;
            zIndex -= 1;
            margin += 2;
        }

        else if(i < noBoxes/2) {
            scale += 0.25;
            zIndex += 1;
            margin -= 2;
        } 

        else {
            scale -= 0.25;
            zIndex -= 1;
            margin += 2;
        }
    }
}


function deleteBox (k) {
    if(flag==1) {
        return;
    }

    flag = 1;
    console.log(box)
    
    if (k == -1) {
        var removeTarget = box[0];
        restoreProperty(k)
        flex.classList.toggle("left_animation");
    }

    else {
        var removeTarget = box[box.length - 1];
        restoreProperty(k)
        flex.classList.toggle("right_animation");
    }
    

    removeTarget.style.opacity = "0";
    removeTarget.style.transform = "scale(0.75)";
    

    setTimeout(function() {
        removeTarget.parentNode.removeChild(removeTarget);
        if (k == -1) {
            flex.classList.toggle("left_animation");
            flex.innerHTML += "<div class='box'>Hello this is box6</div>"
        }
        else {
            flex.classList.toggle("right_animation");
            flex.innerHTML = "<div class='box'>Hello this is box6</div>" + flex.innerHTML;
        }

        restoreProperty(0)
        console.log(flex)

        flag = 0;
    }, 1000);



}


restoreProperty(0);
var flag = 0;


