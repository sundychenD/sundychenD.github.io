$(window).scroll(function () {
	var scrollPos = $(document).scrollTop();
	var problemTriggerPoint = $('#problem').offset().top - 300;
	if (scrollPos > problemTriggerPoint) {
		['#problem-paragraph-1', '#problem-paragraph-2', '#problem-paragraph-3'].forEach(addFadeInUpAnimation)
	}
});

function addFadeInUpAnimation(element, index, array) {
	$(element).removeClass('transparent')
	$(element).addClass('animated');
	$(element).addClass('fadeInUp');
}