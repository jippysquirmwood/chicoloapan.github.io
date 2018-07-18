var i=0;

function pageLoadControl (){
    i=0;
    document.getElementById("genericSpan").innerHTML = "i value at page load = " + i;
}

window.onload = pageLoadControl;


//this function opens the side nav, but does not fix it
function openNav() {
    i=1;
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("openbtn").style.display = "none";
    document.getElementById("closebtn").style.display = "none";
    document.getElementById("fixedbtn").style.display = "block";
    document.getElementById("genericSpan").innerHTML = "i value = " + i;
}

//this function fixes width of the side nav

function fixNav() {
    i=2;
    document.getElementById("openbtn").style.display = "none";
    document.getElementById("closebtn").style.display = "block";
    document.getElementById("fixedbtn").style.display = "none";
}

//this function closes the sidenav
function closeNav() {
//state control
    i=0;
//appearance control
    document.getElementById("mySidenav").style.width = "30px";
    document.getElementById("main").style.marginLeft = "30px";
    document.getElementById("openbtn").style.display = "block";
    document.getElementById("closebtn").style.display = "none";
    document.getElementById("fixedbtn").style.display = "none";
//content control    
    document.getElementById("genericSpan").innerHTML = "i value = " + i;
}

