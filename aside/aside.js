
//declare all classes and elements in html doc here

    //by element

    //by class
        let sidenav = document.getElementsByClassName("sidenav")
        let closebtn = document.getElementsByClassName("closebtn")

    //by id
        let mySidenav = document.getElementById("mySidenav")
        let main = document.getElementById("main")
        let genericSpan = document.getElementById("genericSpan")



let j=0

function openNav() {
    j=1;
    mySidenav.style.width = "250px";
    main.style.marginLeft = "250px";
    genericSpan.innerHTML = "hello " + j;
}

function closeNav() {
    mySidenav.style.width = "30px";
    main.style.marginLeft= "30px";
}