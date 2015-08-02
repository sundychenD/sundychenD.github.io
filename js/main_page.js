/*
$('#home_button').click(function() {
	var b_img = $('#main_container').css('background-image');
	var blured_b_img = b_img.slice(0, -5) + "-blur.jpg";
	$('#main_container').css('background-image', blured_b_img);
});
*/


function blur_background() {
	$('#main_bg').fadeTo("slow", 0);
	$('#main_bg_blur').fadeTo("fast", 1);
}

function unblur_background() {
	$('#main_bg').fadeTo("fast", 1);
	$('#main_bg_blur').fadeTo("slow", 0);
}

function home_action() {
	if ($('#main_bg').css("opacity") == 0) {
		unblur_background();
	}
}

function about_action() {
	if ($('#main_bg').css("opacity") == 1) {
		blur_background();
	}
}

function projects_action() {
	if ($('#main_bg').css("opacity") == 1) {
		blur_background();
	}
}