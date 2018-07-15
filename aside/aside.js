
//declare all classes and elements in html doc here

    //by element

    //by class
        let sidenav = document.getElementsByClassName("sidenav")
        let closebtn = document.getElementsByClassName("closebtn")

    //by id
        let mySidenav = document.getElementById("mySidenav")
        let main = document.getElementById("main")
        let genericSpan = document.getElementById("genericSpan")



var i=0;

function openNav() {
    i++;
    mySidenav.style.width = "250px";
    main.style.marginLeft = "250px";
    genericSpan.innerHTML = "hello " + i;
}

function newFunction() {
    j = 1;
}

function closeNav() {
    mySidenav.style.width = "30px";
    main.style.marginLeft= "30px";
}