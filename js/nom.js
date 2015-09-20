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
	$('.nomPage .nom-svg-container path').attr("class", "nom-change-color-in");
	$('.nomPage .designCirc').attr("class", "designCirc nom-change-color-in");
	$('.nomPage .photoCirc').attr("class", "photoCirc nom-change-color-in");
	
	//$('.nomPage .nom-circ').addClass('animated rubberBand');
	animationArtCircle();
	//startTrail();
}

function stopAnimateNomPage()
{
	$('.nomPage .nom-svg-container path').attr("class", "nom-change-color-out");
	$('.nomPage .designCirc').attr("class", "designCirc nom-change-color-out");
	$('.nomPage .photoCirc').attr("class", "photoCirc nom-change-color-out");
	
	$('.nomPage .nom-circ .pencil').stop();
	$('.nomPage .nom-circ .rect1').stop();
	$('.nomPage .nom-circ .rect2').stop();
	

	//$('.nomPage .nom-circ').removeClass('animated rubberBand');
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

	return 'translate('+x+','+y+') rotate('+r+')';
}

var pencilX;
var pencilY;
var pencilR;

function getPencilAnimation(pencilElement,dur, pencilParam, completeFunc){

	var pencilAnim = function(){ 
	
		var locCompleteFunc = completeFunc;
	
		pencilElement.animate(
			pencilParam,
			{
				duration: dur,
				step: function(now , fx) {
						
						if (fx.prop == "x") {
		
							pencilX = now ;
				
						} else if (fx.prop == "y") {
							pencilY = now;

						} else if (fx.prop == "r") {
							pencilR = now;
						}

						$(this).attr('transform', createTransformAttr(pencilX,pencilY,pencilR)); 
					},
				
				complete: completeFunc
			})};
	
	return pencilAnim;
}

function getRectAnimation(element, v, dur, completeFunc){

	var locCompleteFunc = completeFunc;
	
	var last = 0;
	
	var fun = function(){ 
		
			element.animate(
				{ xziki: v},
				{
					duration : dur,
					step	 : function(now,fx) {
										$(this).attr("x", now);
										console.log(now);
									},
					complete : locCompleteFunc
				})};
				
	return fun;
}

function animationArtCircle(){
	
	pencilX = 0;
	pencilY = 67,
	pencilR = -90;
	
	var shift = 57.5;
	var animDura = 150;
	var penAnimDura = 1000;
	
	var pencil1 = { x: pencilX, y:pencilY ,r: pencilR};
	var pencil2 = { x: 50, y:0 ,r: 0};
	var pencil3 = { x: 115, y:49 ,r: 90};
	var pencil4 = { x: 67, y:115 ,r: 180};
	var pencil5 = { x: 9, y:86 ,r: 250};
	
	var pencilElement = $('.nomPage .nom-circ .pencil');
	var rect1Element =  $('.nomPage .nom-circ .rect1');
	var rect2Element = $('.nomPage .nom-circ .rect2');
	
	//pencilElement.attr('transform', createTransformAttr(pencil1.x,pencil1.y,pencil1.r));
	
	var rect4Anim = getRectAnimation(rect2Element, -shift - shift, animDura);
	var pencil5Anim = getPencilAnimation(pencilElement, penAnimDura, pencil5,rect4Anim);
	var rect3Anim = getRectAnimation(rect2Element, -shift, animDura, pencil5Anim);
	var pencil4Anim = getPencilAnimation(pencilElement,penAnimDura,pencil4,rect3Anim);
	var rect2Anim = getRectAnimation(rect1Element, shift + shift, animDura, pencil4Anim);
	var pencil3Anim = getPencilAnimation(pencilElement,penAnimDura,pencil3,rect2Anim);
	var rect1Anim = getRectAnimation(rect1Element, shift, animDura, pencil3Anim);	
	var pencil2Anim = getPencilAnimation(pencilElement,penAnimDura,pencil2,rect1Anim);
	var rect2AnimInit = getRectAnimation(rect2Element, 0, 1, pencil2Anim);
	var rect1AnimInit = getRectAnimation(rect1Element, 0, 1, rect2AnimInit);	
	var pencil1Anim = getPencilAnimation(pencilElement,0,pencil1,rect1AnimInit);

	
	pencil1Anim();
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
   //windowResizeHandler();
}
