var el_navbar = document.getElementById('navbar');
var el_fixedcontent = document.getElementById('fixedcontent');
var el_parent_fc = el_fixedcontent.parentNode;
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
	el_fixedcontent.style.top = (150.0-n) + '%';

	if(sY < 600){

		a_home.style.color = "white";
		a_about.style.color = "black";
		a_contact.style.color = "black";

	} else if(sY > 600 && sY < 1200) {

		a_home.style.color = "black";
		a_about.style.color = "white";
		a_contact.style.color = "black";

	} else if (sY > 1200) {

		a_home.style.color = "black";
		a_about.style.color = "black";
		a_contact.style.color = "white";

	}


	el_parent_fc.style.backgroundPosition = '0% ' + ((sY/sYMax) * -200.00) + '%';

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

var form = $('form');
form.submit(function(evt) {

	$.ajax({

		url: "sendmessage.php",
		type: "POST",
		data: form.serialize(),

		success: function(result, stat, xhr) {

			var middle = 50 - (((500/window.screenX)/2.0)*100.0);

			if( result.length > 0 ) {

				var html = '<div id="message" style="position:fixed; display: block; top: 50%; left: '+middle+'%; width: 500px; height: 200px; background: red; color: black; z-index: 10000;"><h2 style="text-align: center; line-height: 200px;">Message Not Sent!<span style="font-size: 16px;">(click to remove message)</span></h2></div>';
				$('body').append(html)
				$('#message').click(function(){ $(this).remove(); });

			} else {

				var html = '<div id="message" style="position:fixed; display: block; top: 50%; left: '+middle+'%; width: 500px; height: 200px; background: lightblue; color: black; z-index: 10000;"><h2 style="text-align: center; line-height: 200px;">Message Sent!<span style="font-size: 16px;">(click to remove message)</span></h2></div>';
				$('body').append(html)
				$('#message').click(function(){ $(this).remove(); });

			}

		},

		error: function(xhr, stat, err) {
		}

	});

	evt.preventDefault();

});