var flex = document.getElementById("flex");

var box = flex.getElementsByClassName("box");


restoreProperty = function () {
    // var scale = 1;
    // var zIndex = 1;
    // var margin = 4;
    // var noBoxes = box.length;
    
    // for (var i = 0; i < noBoxes; i++) {
        
    //     box[0].style.transform = "scale("+scale+")";
    //     box[0].style.zIndex = ""+zIndex;
    //     box[0].style.margin = "-"+margin+"%";

    //     if(i == noBoxes/2) {
            
    //         scale -= 0.25;
    //         zIndex -= 1;
    //         margin += 2;
    //     }

    //     else if(i < noBoxes/2) {
    //         scale -= 0.25;
    //         zIndex -= 1;
    //         margin += 2;
    //     } 

    //     else {
    //         scale -= 0.25;
    //         zIndex -= 1;
    //         margin += 2;
    //     }
    // }

    box[0].style.transform = "scale(1)";
    box[1].style.transform = "scale(1.25)";
    box[2].style.transform = "scale(1.5)";
    box[3].style.transform = "scale(1.25)";
    box[4].style.transform = "scale(1)";

    box[0].style.zIndex = "1";
    box[1].style.zIndex = "2";
    box[2].style.zIndex = "3";
    box[3].style.zIndex = "2";
    box[4].style.zIndex = "1";

    box[0].style.margin = "-4%";
    box[1].style.margin = "-2%";
    box[2].style.margin = "0";
    box[3].style.margin = "-2%";
    box[4].style.margin = "-4%";
}



leftProperty = function () {

    box[1].style.transform = "scale(1)";
    box[2].style.transform = "scale(1.25)";
    box[3].style.transform = "scale(1.5)";
    box[4].style.transform = "scale(1.25)";

    box[1].style.zIndex = "1";
    box[2].style.zIndex = "2";
    box[3].style.zIndex = "3";
    box[4].style.zIndex = "2";

    box[1].style.margin = "-4%";
    box[2].style.margin = "-2%";
    box[3].style.margin = "0";
    box[4].style.margin = "-2%";

    flex.classList.toggle("left_animation");
}


function deleteBox () {
    if(flag==1) {
        return;
    }
    flag = 1;
    console.log(box)
    
    
    var removeTarget = box[0];
    leftProperty()

    removeTarget.style.opacity = "0";
    removeTarget.style.transform = "scale(0.75)";
    

    setTimeout(function() {
        removeTarget.parentNode.removeChild(removeTarget);
        flex.classList.toggle("left_animation");
        flex.innerHTML += "<div class='box'>Hello this is box6</div>"
        restoreProperty()
        console.log(flex)

        flag = 0;
    }, 1000);



}


restoreProperty();
var flag = 0;


