function show_block(block_id) {
	$(block_id).fadeTo("fast", 1);
	$(block_id).show();
}

function hide_block(block_id) {
	$(block_id).fadeTo("fast", 0);
	$(block_id).hide();
}

function remove_active(nav_id) {
	$(nav_id).removeClass("uk-active");
}

function add_active(nav_id) {
	$(nav_id).addClass("uk-active");
}

function update_block(block_id) {
	var blocks = ["#projects_block", "#about_block", "#snippets_block"]
	for (var index = 0; index < blocks.length; index ++) {
		if (blocks[index] != block_id) {
			hide_block(blocks[index]);
		} else {
			show_block(blocks[index]);
		}
	}
}

function update_nav(nav_id) {
	var navs = ["#projects_nav", "#about_nav", "#snippets_nav"]
	for (var index = 0; index < navs.length; index ++) {
		if (navs[index] != nav_id) {
			remove_active(navs[index]);
		} else {
			add_active(navs[index]);
		}
	}
}

function about_action() {
	update_nav("#about_nav");
	update_block("#about_block");
}

function projects_action() {
	update_nav("#projects_nav");
	update_block("#projects_block");
}

function snippets_action() {
	update_nav("#snippets_nav");
	update_block("#snippets_block");
}




