var i = 0;

function proceso(){
    document.getElementById("mySidenav").style.width = "115px";
    document.getElementById("mySidenav").style.transition = "0.5s";
    document.getElementById("main").style.marginLeft = "135px";
    document.getElementById("main").style.transition = "0.5s";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.getElementById("opbtn").style.display = "none";
    document.getElementById("fijobtn").style.display = "block";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "20px";
    document.getElementById("mySidenav").style.transition = "0.5s";
    document.getElementById("main").style.marginLeft = "20px";
    document.getElementById("main").style.transition = "0.5s";
    document.body.style.backgroundColor = "white";
    document.getElementById("opbtn").style.display = "block";
    document.getElementById("closebtn").style.display = "none";
    document.getElementById("fijobtn").style.display = "none";
    i = 0;
}

function fijoNav(){
    document.body.style.backgroundColor = "white";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("fijobtn").style.display = "none";
    i = 1;
}


$(document).on("click",function(e) {
                    
    var container = $("#side");
                       
       if (!container.is(e.target) && container.has(e.target).length === 0 && i < 1) { 
        closeNav();               
       }
});