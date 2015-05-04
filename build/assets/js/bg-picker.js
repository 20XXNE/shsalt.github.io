$(document).ready(function(){
	switch(Math.floor((Math.random()*5)+1)){
		case 1: 
			$("header").css("background-image", "../img/startupweekend1.jpg");
			break;
		case 2:
			$("header").css("background-image", "../img/pi.jpg");
			break;
		case 3: 
			$("header").css("background-image", "../img/wip.jpg");
			break;
		case 4:
			$("header").css("background-image", "..img/downtown.jpg");
			break;
		case 5:
			$("header").css("background-image", "..img/at-work.jpg");
			break;
	}
});

