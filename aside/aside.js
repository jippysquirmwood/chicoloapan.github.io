let j=0

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    j=1;
    document.getElementById("id span").innerHTML="openNav has run!";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "30px";
    document.getElementById("main").style.marginLeft= "30px";
}