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

function show_block(block_name) {
	$(block_name).show();
	$(block_name).fadeTo("fast", 1);
}

function hide_block(block_name) {
	$(block_name).fadeTo("fast", 0);
	$(block_name).hide();
}

function toggle_block(block_name) {
	if ($(block_name).css("opacity") == 0) {
		show_block(block_name);
	} else {
		hide_block(block_name);
	}
}

function home_action() {
	if ($('#main_bg').css("opacity") == 0) {
		unblur_background();
	}
	update_block("clear");
}

function update_block(block_name) {
	var blocks = ["#about_block", "#projects_block"]
	for (var index = 0; index < blocks.length; index ++) {
		if (blocks[index] == block_name) {
			show_block(block_name);
		} else {
			hide_block(blocks[index]);
		}
	}
}

function about_action() {
	if ($('#main_bg').css("opacity") == 1) {
		blur_background();
	}

	update_block("#about_block");
}

function projects_action() {
	if ($('#main_bg').css("opacity") == 1) {
		blur_background();
	}

	update_block("#projects_block");
}