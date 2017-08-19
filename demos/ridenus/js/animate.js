$(window).scroll(function () {
	var scrollPos = $(document).scrollTop();
	var problemTriggerPoint = $('#problem').offset().top - 300;
	var solution_1_TriggerPoint = $('#solution-1').offset().top - 300;
	var solution_2_TriggerPoint = $('#solution-2').offset().top - 300;
	var solution_3_TriggerPoint = $('#solution-3').offset().top - 300;
	var solution_4_TriggerPoint = $('#solution-4').offset().top - 300;
	var solution_5_TriggerPoint = $('#solution-5').offset().top - 300;

	if (scrollPos > problemTriggerPoint) {
		['#problem-paragraph-1', '#problem-paragraph-2', '#problem-paragraph-3'].forEach(addFadeInUpAnimation)
	}

	if (scrollPos > solution_1_TriggerPoint) {
		['.solution-1-img'].forEach(addFadeInUpAnimation)
	}

	if (scrollPos > solution_2_TriggerPoint) {
		['.solution-2-img'].forEach(addFadeInUpAnimation)
	}

	if (scrollPos > solution_3_TriggerPoint) {
		['.solution-3-img'].forEach(addFadeInUpAnimation)
	}

	if (scrollPos > solution_4_TriggerPoint) {
		['.solution-4-img'].forEach(addFadeInUpAnimation)
	}

	if (scrollPos > solution_5_TriggerPoint) {
		['.solution-5-img'].forEach(addFadeInUpAnimation)
	}
});

function addFadeInUpAnimation(element, index, array) {
	$(element).removeClass('transparent')
	$(element).addClass('animated');
	$(element).addClass('fadeInUp');
}