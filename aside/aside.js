var i=0;

function openNav() {
    i++;
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    genericSpan.innerHTML = "hello " + i;
}

function newFunction() {
    i = 1;
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "30px";
    document.getElementById("main").style.marginLeft = "30px";
}