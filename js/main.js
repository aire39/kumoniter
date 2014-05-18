var el_navbar = document.getElementById("navbar");

var chknav = function(){

	var sY = window.scrollY;

	if(sY>0)
		el_navbar.style.position = "fixed";
	else
		el_navbar.style.position = "relative";
}

setInterval( chknav, 16 );
