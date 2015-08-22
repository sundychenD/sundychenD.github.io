/*
$('#home_button').click(function() {
	var b_img = $('#main_container').css('background-image');
	var blured_b_img = b_img.slice(0, -5) + "-blur.jpg";
	$('#main_container').css('background-image', blured_b_img);
});
*/
var bgArray = [{'clear': 'Torii.jpg', 'blur': 'Torii-blur.jpg'}, 
			   {'clear': 'Kiyomizu.jpg', 'blur': 'Kiyomizu-blur.jpg'}, 
			   {'clear': 'Fushimi.jpg', 'blur': 'Fushimi-blur.jpg'}, 
			   {'clear': 'Train_01.jpg', 'blur': 'Train_01-blur.jpg'},
			   {'clear': 'Brunei.jpg', 'blur': 'Brunei-blur.jpg'}, 
			   {'clear': 'Skytree_cloud.jpg', 'blur': 'Skytree_cloud-blur.jpg'}, 
			   {'clear': 'NY_01.jpg', 'blur': 'NY_01-blur.jpg'}, 
			   {'clear': 'Garden_01.jpg', 'blur': 'Garden_01-blur.jpg'},
			   {'clear': 'SF_sea.jpg', 'blur': 'SF_sea-blur.jpg'}, 
			   {'clear': 'Garden_02.jpg', 'blur': 'Garden_02-blur.jpg'}, 
			   {'clear': 'SF_street.jpg', 'blur': 'SF_street-blur.jpg'},
			   {'clear': 'UCB_Library.jpg', 'blur': 'UCB_Library-blur.jpg'}];

function blur_background() {
	if (is_showing_real_clear()) {
		$('#main_bg').fadeTo("slow", 0);
		$('#main_bg_blur').fadeTo("fast", 1);
	} else {
		$('#main_bg_dummy').fadeTo("slow", 0);
		$('#main_bg_blur_dummy').fadeTo("fast", 1);
	}
}

function unblur_background() {
	if (is_showing_real_blur()) {
		$('#main_bg').fadeTo("fast", 1);
		$('#main_bg_blur').fadeTo("slow", 0);
	} else {
		$('#main_bg_dummy').fadeTo("fast", 1);
		$('#main_bg_blur_dummy').fadeTo("slow", 0);
	}
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

function is_clear_state() {
	return $('#main_bg').css('opacity') == 1 || $('#main_bg_dummy').css('opacity') == 1;
}

function about_action() {
	if (is_clear_state()) {
		blur_background();
	}

	update_block("#about_block");
}

function projects_action() {
	if (is_clear_state()) {
		blur_background();
	}

	update_block("#projects_block");
}


function is_showing_real_clear() {
	return $('#main_bg').css('opacity') == 1;
}

function is_showing_real_blur() {
	return $('#main_bg_blur').css('opacity') == 1;
}

function switch_effect(new_bg, old_bg, new_bg_path) {
	// Prepare new bg
	$(new_bg).css('opacity', 0);
	$(new_bg).css('background-image', new_bg_path);
	
	// Show switching process
	$(old_bg).fadeTo("slow", 0);
	$(new_bg).fadeTo("slow", 1);
}

function update_bg(bg, new_bg_path) {
	$(bg).css('background-image', new_bg_path);
}

function get_cur_bg_url() {
	if (is_real_state()) {
		return $("#main_bg").css('background-image');
	} else {
		return $("#main_bg_dummy").css('background-image');
	}
}

function get_new_bg() {
	var cur_bg_clear_url = get_cur_bg_url();
	var new_bg_obj = bgArray[Math.floor(Math.random() * bgArray.length)];
	while (cur_bg_clear_url.indexOf(new_bg_obj['clear']) != -1) {
		new_bg_obj = bgArray[Math.floor(Math.random() * bgArray.length)];
	}
	return new_bg_obj;
}

function is_real_state() {
	return $('#main_bg').css('opacity') == 1 || $('#main_bg_blur').css('opacity') == 1;
}

function change_background() {

	// Get new bg image
	var bg = get_new_bg();
	var new_clear_path = 'url(images/bg/' + bg['clear'] + ')';
	var new_blur_path = 'url(images/bg/' + bg['blur'] + ')';

	var new_bg_clear;
	var old_bg_clear;
	var new_bg_blur;
	var old_bg_blur;

	if (is_real_state()) {
		new_bg_clear = '#main_bg_dummy';
		old_bg_clear = '#main_bg';
		new_bg_blur = '#main_bg_blur_dummy';
		old_bg_blur = '#main_bg_blur';
	} else {
		new_bg_clear = '#main_bg';
		old_bg_clear = '#main_bg_dummy';
		new_bg_blur = '#main_bg_blur';
		old_bg_blur = '#main_bg_blur_dummy';
	}

	if (is_clear_state()) {
		switch_effect(new_bg_clear, old_bg_clear, new_clear_path);
		update_bg(new_bg_blur, new_blur_path);
	} else {
		switch_effect(new_bg_blur, old_bg_blur, new_blur_path);
		update_bg(new_bg_clear, new_clear_path);
	}
}
