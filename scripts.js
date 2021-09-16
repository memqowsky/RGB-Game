
document.getElementById("start").addEventListener('click', start);

function start(){

    /* this function makes the welcome screen dissapeared */

    document.getElementById("welcome").classList.add("disapeared")    
    document.getElementById("gameTag").classList.add("disapeared")
    document.getElementById("start").classList.add("disapeared")
}

const sleep = (milliseconds) => { // we just need to define a sleep function
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var newColors = document.getElementById("newColors");
var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");

newColors.addEventListener('click', change);

var points=0;

var colorDivs = document.getElementsByClassName("colorDIV");

for(var i=0; i<colorDivs.length; i++)
{
    var colorDiv = colorDivs[i];
    colorDiv.addEventListener('click', checkTrue);
}
var rightDIV, points; //global variables, we need to be allowed to have acces to this variables in different functions

function borders(){   

    /*  this function makes the RIGHTDIV border green and makes the rest of divs border green 
        just to let user see which one was correct */
    
    document.getElementById("first").style.border = "2px solid #bd1b45";
    document.getElementById("second").style.border = "2px solid #bd1b45";
    document.getElementById("third").style.border = "2px solid #bd1b45";

    if(globalThis.rightDIV=="first"){
        document.getElementById("first").style.border = "2px solid green";
    }
    else if(globalThis.rightDIV=="second"){
            document.getElementById("second").style.border = "2px solid green";
        }
    else{
            document.getElementById("third").style.border = "2px solid green";
        }    

    sleep(1000).then(() => { 

        document.getElementById("first").style.border = "none";
        document.getElementById("second").style.border = "none";
        document.getElementById("third").style.border = "none";
    }) 
}

function change(){

    /*  this function changes the states of divs
        we want to have 3 divs: MAINDIV, SIMDIV and anDIV.
        *MAINDIV is a div that has correct RGB values
        *SIMDIV is a div that has RGB values that are similar to the correct values (+/- 30 points in each R or G or B value)
        *ANDIV is a div that has another, complete random values that are not (but can be) similar to the correct color */
    
    var mainDiv, simDiv, anDiv, temp;

    switch(Math.floor(Math.random()*3)+1){  // taking a rand() in range 1-3

        case 1: // if it's equal to 1  we set the "first" div to MAINDIV

            mainDiv = document.getElementById("first"); 
            temp = Math.floor(Math.random()*2)+2;
            globalThis.rightDIV = "first";
            

            if(temp==2){ // now we need to draw the SIMDIV, and the last one is anDIV

                simDiv = document.getElementById("second");
                anDiv = document.getElementById("third");

            }else{ 
                
                simDiv = document.getElementById("third");
                anDiv = document.getElementById("second");

            }
            break;

        case 2: // if it's equal to 2  we set the "second" div to MAINDIV


            mainDiv = document.getElementById("second");
            temp = Math.floor(Math.random()*2)+2;
            globalThis.rightDIV = "second"

            if(temp==2){ // now we need to draw the SIMDIV, and the last one is anDIV

                simDiv = document.getElementById("first");
                anDiv = document.getElementById("third");

            }else{ 
                
                simDiv = document.getElementById("third");
                anDiv = document.getElementById("first");

            }
            break;

        case 3: // if it's equal to 2  we set the "third" div to MAINDIV

            mainDiv = document.getElementById("third");
            temp = Math.floor(Math.random()*2)+2;
            globalThis.rightDIV = "third"

            if(temp==2){ // now we need to draw the SIMDIV, and the last one is anDIV

                simDiv = document.getElementById("first");
                anDiv = document.getElementById("second");

            }else{ 
                
                simDiv = document.getElementById("second");
                anDiv = document.getElementById("first");

            }
            break;

    }

    reload(mainDiv, simDiv, anDiv);
    
}

function reload(mainDiv, simDiv, anDiv){
    
    /*  this function fills the divs with random RGB values 
        it is also changing the right RGB values in header. */

    rand = new Array(3);

    for(var i=0;i<3;++i){
        rand[i] = Math.floor(Math.random()*255);
    }

    mainDiv.style.backgroundColor =
    "rgba(" + rand[0] + "," + rand[1] + "," + rand[2] + ", 1)"; // we need to fill a background color of a MAINDIV with random (0-255) numbers

    var header1 = document.getElementById("header1");

    header1.innerText = "RGB("+ rand[0] + "," + rand[1] + "," + rand[2] + ")" // here we set h1 values to true MAINDIV backgroundColor values

    for(var i=0;i<3;i++){

        switch(Math.floor(Math.random()*2)+0){
            case 0:
                rand[i] += Math.floor(Math.random()*10)+50;
                break;
            case 1:
                rand[i] -= Math.floor(Math.random()*10)+50;
                break;
        }

        if(rand[i]<0) rand[i]=0;
        if(rand[i]>255) rand[i]=255;

    }

    simDiv.style.backgroundColor =
    "rgba(" + rand[0] + "," + rand[1] + "," + rand[2] + ", 1)"; // we need to fill a background color of a SIMNDIV with similar to MAINDIV values of RGB


    anDiv.style.backgroundColor =
    "rgba(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ", 1)";

}

function rightClick(){

    /* when user clicks right div this function is being called */

    ++globalThis.points;
    document.getElementById("points").innerText = "POINTS: " + globalThis.points;

    borders();
    sleep(1000).then(() => { 
    change();
    })

}

function badClick(){

    /* when user clicks bad div this function is being called */

    --globalThis.points;
    document.getElementById("points").innerText = "POINTS: " + globalThis.points;

    borders();
    sleep(1000).then(() => { 
    change();
    })
}

function checkTrue(event){

    /* this function is just checking that, the user clicked the right div */

    if(event.srcElement.id == globalThis.rightDIV){
        rightClick();
    }
    else{
        badClick();
    }
    
}

/* this code is checking that, the page is loaded, and call change() function when the page is already loaded */

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', change)
} else {
    change();
}


