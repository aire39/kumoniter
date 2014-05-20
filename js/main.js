var el_navbar = document.getElementById('navbar');
var el_fixedcontent = document.getElementById('fixedcontent');
var sYMax = window.scrollMaxY;

var a_home = document.getElementById("a_home");
var a_about = document.getElementById("a_about");
var a_contact = document.getElementById("a_contact");

var SCROLLSPEED = 20;
var TIMESPEED = 16;

var chknav = function(){

	var sY = window.scrollY;

	if(sY>0) {
		el_navbar.style.position = "fixed";
		el_navbar.style.opacity = 0.85;
	}
	else {
		el_navbar.style.position = "relative";
		el_navbar.style.opacity = 1.0;
	}
}

var scrollmid = function(){

	var sY = window.scrollY;
	var n = ((sY / sYMax) * 100.0) * 3.00;
	el_fixedcontent.style.top = (166.0-n) + '%';


}

function slide_to_home() {

	var cY = window.scrollY - SCROLLSPEED;
	window.scrollTo(window.scrollX, cY);
	var st = setTimeout(function(){ if(cY > 0) slide_to_home(); else clearTimeout(st); }, TIMESPEED);

}

function slide_to_about() {

	var cY = (window.scrollY > 800) ? window.scrollY - SCROLLSPEED : window.scrollY + SCROLLSPEED;
	window.scrollTo(window.scrollX, cY);
	var st = setTimeout(function(){ if((cY < 800-SCROLLSPEED || cY > 800+SCROLLSPEED)) slide_to_about(); else clearTimeout(st); }, TIMESPEED);

}

function slide_to_contact() {

	var cY = window.scrollY + SCROLLSPEED;
	window.scrollTo(window.scrollX, cY);
	var st = setTimeout(function(){ if(cY < window.scrollMaxY) slide_to_contact(); else clearTimeout(st); }, TIMESPEED);

}

a_home.onclick = slide_to_home;
a_about.onclick = slide_to_about;
a_contact.onclick = slide_to_contact;

setInterval( chknav, TIMESPEED );
setInterval( scrollmid, TIMESPEED );
