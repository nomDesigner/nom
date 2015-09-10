function isNavMobileMode() {
    return ($('.navbar-toggle').css('display') != 'none');
};

function animationWhenEnter(elementString, animationNameArg)
{
	animatted = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	inAnimation  = 'nav-color-in';
	outAnimation = 'nav-color-out';
	
	$(elementString).mouseenter(function(event) {

		element = $(event.target);

		element.removeClass(outAnimation);
		element.addClass(inAnimation);
			
	});

	$(elementString).mouseleave(function(event) {

		element.removeClass(inAnimation);
		element.addClass(outAnimation);
	});
}

function animateNomPage()
{
	$('.nomPage g path').attr("class", "nom-change-color-in");
	$('.nomPage g circle').attr("class", "nom-change-color-in");
	$('.nomPage .nom-circ').addClass('animated rubberBand');
}

function stopAnimateNomPage()
{
	$('.nomPage g path').attr("class", "nom-change-color-out");
	$('.nomPage g circle').attr("class", "nom-change-color-out");
	$('.nomPage .nom-circ').removeClass('animated rubberBand');
}

function animateText(elementName)
{
	// code by www.voidcanvas.com
	var textDiv = $(elementName);
	var sentence = textDiv.html().split("");
	textDiv.html("");

	$.each(sentence, function(index, val) {
		if (val == " ") {
			val = "&nbsp;";
		}
		var letter = $("<div/>", {
			id : "txt" + index,
		}).html(val).appendTo(textDiv);
		
	});

}

function initFullPage()
{
	 $('#fullpage').fullpage({
	
        //Navigation
        menu: false,
        lockAnchors: false,
        anchors:['nomPage', 'artPage', 'designPage', 'photoPage' ,'aboutUs', 'contactUs'],
        navigation: false,
        navigationPosition: 'right',
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: true,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
        scrollOverflow: true,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: false,
        resize : false,
        sectionsColor: ['#9ED7E8', '#9ED7E8', '#7E8F7C', '#1BBC9B'],
        paddingTop: '50px',
        paddingBottom: '0px',
        fixedElements: '.fullPageHeader, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.fullpageSlide',

        //events
        onLeave: function(index, nextIndex, direction){
	
			stopAnimateNomPage();
			
			if (nextIndex == 1)
			{
				animateNomPage();
			}
			
			if (nextIndex == 2)
			{
			
				
				/*
				$('.OurGames1 .ziki').addClass('animated bounceInUp').
				one(animatted, function(){
					$('.OurGames1 .ziki').removeClass('animated bounceInUp');
				});;
				*/
			}
			
		},

        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
		});
}

function initLinksNomPage()
{
	$('.nomPage table tr .nom-circ').click(function() {
  		 location.href = $(this).data('url');
	});
}

$(document).ready(function() {

		initLinksNomPage();

		animateNomPage();
		

		$(window).resize(function() {
		   
		});
		
		animationWhenEnter('nav ul a', ' pulse');

		$('nav ul a').on('click', function(event){
		
			if (isNavMobileMode())
			{
				setTimeout(function(){
					$('.navbar-toggle').click(); 
				}, 300); 
			}
		});

		initFullPage();
   
});