
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
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    j=1;
    document.getElementById("id span").innerHTML = "hello";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "30px";
    document.getElementById("main").style.marginLeft= "30px";
}