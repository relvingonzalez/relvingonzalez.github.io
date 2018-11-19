// Empty JS for your own code to be here


$(document).ready(function(){
    $(window).bind('scroll', function() {
        var navHeight = 150;
        if ($(window).scrollTop() > navHeight) {
        $('.header').addClass('fixed');
        $(this).css('margin','0');                    
        }
        else {
        $('.header').removeClass('fixed');
        $(this).css('margin','-100px'); 
        }
    });
});
    
	
$(document).ready(function(){
	$('a.nlink1').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').animate({
			'scrollTop': $target.offset().top - 270
		}, 1000, 'swing');
	});
	$('a.nlink2, a.see-more').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').animate({
			'scrollTop': $target.offset().top - 270
		}, 1000, 'swing');
	});
	
	$('a.nlink3').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').animate({
			'scrollTop': $target.offset().top + 10
		}, 1000, 'swing');
	});
	
	$('a.nlink4, a.nlink5').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').animate({
			'scrollTop': $target.offset().top - 100
		}, 1000, 'swing');
	});
	
	$('a.nlink6, a.nlink7').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').animate({
			'scrollTop': $target.offset().top - 80
		}, 1000, 'swing');
	});
	
	$('a.nlink1').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').animate({
			'scrollTop': $target
		}, 1000, 'swing');
	});
});
	
	