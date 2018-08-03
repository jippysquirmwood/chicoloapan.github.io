/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body*/
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    function iconFunction(x) {
        x.classList.toggle("fa-angle-double-left");
    }
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white*/
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}


/*test
$(document).on('mouseup', function(e) {
    var elem = $(".sidenav");
    if (!elem.is(e.target) && elem.has(e.target).length === 0) {
       $("div.menu_body").slideUp(0);
    }
});*/
