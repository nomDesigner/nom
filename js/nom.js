function isNavMobileMode() {
    return ($('.navbar-toggle').css('display') != 'none');
};

function animationWhenEnter(elementString, animationNameArg)
{
	
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

function runAnimationByAddClass(elementString, className){
		
		animatted = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		
		var element = $(elementString);
		var crClassName = className;
		
		console.log(element);
		
		element.addClass(crClassName).one(animatted, function(){
				element.removeClass(crClassName);
		});;
				
}

function animateNomPage()
{
	$('.nomPage g path').attr("class", "nom-change-color-in");
	$('.nomPage g circle').attr("class", "nom-change-color-in");
	$('.nomPage .nom-circ').addClass('animated rubberBand');
	animationArtCircle();
	//startTrail();
}

function stopAnimateNomPage()
{
	$('.nomPage g path').attr("class", "nom-change-color-out");
	$('.nomPage g circle').attr("class", "nom-change-color-out");
	$('.nomPage .nom-circ').removeClass('animated rubberBand');
	//stopTrail();
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
        sectionsColor: ['#9ED7E8', '#F6EF76', '#7E8F7C', '#1BBC9B'],
        paddingTop: '0px',
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
				
				runAnimationByAddClass('.artPage .branchA','animated slideInUp');
				runAnimationByAddClass('.artPage .branchB','animated slideInUp');
			
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
		
		var ref = $(this).data('url');

		location.href = ref;
		
			
	});
}

function initArtPage(){
	$('.artPage .branchA').css('margin-top',window.innerHeight * .4);
	$('.artPage .branchB').css('margin-top',window.innerHeight * .8);
}

function createTransformAttr(x,y,r){

	return 'translate('+x+','+y+') rotate(+'+r+')';
}

var pencilX;
var pencilY;
var pencilR;

function getPencilAnimation(pencilElement, pencilParam, completeFunc){

	var locCompleteFunc = completeFunc;
	var lastX = 0;
	var lastY = 0;
	var lastR = 0;
	
	var pencilAnim = function(){ 
		pencilElement.animate(
			pencilParam,
			{
				duration: 3000,
				step: function(now , fx) {
						
						if (fx.prop == "x") {
							pencilX += (now - lastX);
							lastX = now;
						} else if (fx.prop == "y") {
							pencilY += (now - lastY);
							lastY = now;
						} else if (fx.prop == "r") {
							pencilR += (now - lastR);
							lastR = now;
						}

						$(this).attr('transform', createTransformAttr(pencilX,pencilY,pencilR)); 
					},
				
				complete: completeFunc
			})};
	
	return pencilAnim;
}

function animationArtCircle(){
	
	pencilX = 0;
	pencilY = 67,
	pencilR = 270;
	
	var shift = 115;
	var animDura = 1000;
	
	var pencil1 = { x: pencilX, y:pencilY ,r: pencilR};
	var pencil2 = { x: 50, y:0 ,r: 0};
	
	var pencilElement = $('.nomPage .nom-circ .pencil');
	
	pencilElement.attr('x',0);
	pencilElement.attr('x',0);
	pencilElement.attr('transform', createTransformAttr(pencil1.x,pencil1.y,pencil1.r));
	
	var pencil1Anim = getPencilAnimation(pencilElement,pencil2);
			
	pencil1Anim();
	
	var secondRectFun = function(){ 
		$('.nomPage .nom-circ .rect2').animate(
			{ x: -shift },
			{
				duration: animDura,
				step: function(now) { $(this).attr("x", now); }
			})};	
		
	$('.nomPage .nom-circ .rect1').animate(
		{ x: shift }, 
		{
			duration: animDura,
			step: function(now) { $(this).attr("x", now); },
			complete: secondRectFun
	});	
		
				
	
}

$(document).ready(function() {

		initLinksNomPage();
		//initTrailNomPage();
		initArtPage();

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

		animateNomPage();
	
});

var resizeId;

$(window).resize(function() {
	clearTimeout(resizeId);
	resizeId = setTimeout(doneResizing, 500);
});
 
 
function doneResizing(){
   windowResizeHandler();
}
