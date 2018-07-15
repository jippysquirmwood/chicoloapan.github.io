var i = 0;

function process(){
    document.getElementById("mySidenav").style.width = "115px";
    document.getElementById("mySidenav").style.transition = "0.5s";
    document.getElementById("main").style.marginLeft = "135px";
    document.getElementById("main").style.transition = "0.5s";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.getElementById("opbtn").style.display = "none";
    document.getElementById("fixedbtn").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "20px";
    document.getElementById("mySidenav").style.transition = "0.5s";
    document.getElementById("main").style.marginLeft = "20px";
    document.getElementById("main").style.transition = "0.5s";
    document.body.style.backgroundColor = "white";
    document.getElementById("opbtn").style.display = "block";
    document.getElementById("closebtn").style.display = "none";
    document.getElementById("fixedbtn").style.display = "none";
    i = 0;
    document.getElementById("thing").innerHTML="i=0";
}

function fixedNav(){
    document.body.style.backgroundColor = "white";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("fixedbtn").style.display = "none";
    i = 1;
    document.getElementById("thing").innerHTML="i=1";
}


function closeClickout(){
    if (i < 1){
    document.getElementById("main").addEventListener("click", closeNav);
    } else {
        document.getElementById("main").removeEventListener("click", closeNav);    
    }

}