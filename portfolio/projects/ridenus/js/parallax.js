/* When scroll to section 4, move iphone image up */
function parallax(parent_object, movable_object, speed) {
  var window_scrolled = $(window).scrollTop();
  var window_height = $(window).height();
  var scroll_start_pos = $(parent_object).offset().top - window_height;

  if (window_scrolled > scroll_start_pos) {
  	var pos_diff = window_scrolled - scroll_start_pos;
  	$(movable_object).css('top', (pos_diff * speed) + 'px');
  }
}

$(window).on("scroll", function (e) {
  parallax('#section-4', '#navigate', -0.15);
  parallax('#section-5', '#profile', 0.15);
});