/* 
 * custom js Document
*/ 

$(window).load(function(){
	layerPop();
	hasBtn();	
});

//layer popup
function layerPop(){
	if(!($('[data-pop-layer]').length > 0)) return;
	$('[data-pop-layer] .popBox').append('<button type="button" class="btn_close"><span>레이어닫기</span></button>');
	$('[data-pop-layer] .btn_close ,[data-pop-layer] .close').on('click',function(){
		 $('[data-pop-layer] .popBox').parent('div').removeClass('active').fadeOut();
		 //$('body').removeClass('active');
		 return false;
	});
	$(document).mouseup(function(e){
		var container = $('[data-pop-layer] .popBox').parent('div'); 
		if(container.has(e.target).length == 0){
			container.removeClass('active').fadeOut();
			//$('body').removeClass('active');
		}
	});
}
function layerClose() {
	$('[data-pop-layer] .popBox').parent('div').removeClass('active').fadeOut();
}
function showPopup(el){
	var $el = $(el);
	$el.fadeIn();
	//$('body').addClass('active');
	setTimeout(function(){
		$el.addClass('active');
	}, 100);
	return false;
}

//top
function hasBtn(){
	$(".btn_top, .hasLink").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 400, function(){   
				window.location.hash = hash;
			});
		} 
	});
}

//visual
$(function(){	
	console.log($(window).width());
	if($(window).width() <= 1400){
		visualSlider = $('.area_visual > ul').bxSlider({
			auto:true,
			autoHover:false,
			pager:true,
			autoControls: true,
			autoControlsCombine:true,
			touchEnabled:false,
			controls: false,
			pause:6000,
			speed:1500,
		});	
	} else {
		visualSlider = $('.area_visual > ul').bxSlider({
			mode:'fade',
			auto:true,
			autoHover:false,
			pager:true,
			autoControls: true,
			autoControlsCombine:true,
			touchEnabled:false,
			controls: false,
			pause:6000,
			speed:2000,
		});	
	}
});


//visual animation
$(function(){
	setTimeout(function(){
		$('.area_visual .visual_txt').addClass('active');
		$('.area_visual .visual_txt').children('em').css("transition","all 0.5s ease 0.4s").addClass("show");
		$('.area_visual .visual_txt').children('span').css("transition","all 0.5s ease 0.4s").addClass("show");
		$('.area_visual .visual_txt').children('p').css("transition","all 0.5s ease 0.6s").addClass("show");
		$('.area_visual .visual_txt').children('a').css("transition","all 0.5s ease 0.8s").addClass("show");
	}, 200);  
});

//phohto slider
$(window).load(function(){
	if($('.photo_slide').length > 0){
		visualSlider = $('.photo_slide .list').bxSlider({
			mode: 'fade',
			auto:true,
			autoHover:false,
			pager:true,
			autoControls: true,
			autoControlsCombine:true,
			pause:6500,
			speed:1500,			
		});
	}
});

//sub text fadeup
$(function(){
	setTimeout(function(){
		$(".area_subVisual h2, .area_subVisual p").addClass("active");
	}, 200);  	
});

//sub visual nav
$(window).load(function(){
	if($("#wrap .lnb").length > 0){
		var lnbLeft = $('.lnb ul > li a.on').offset().left;
		$('.area_lnb > div').animate( { scrollLeft : lnbLeft }, 1000 );
	}
});

//공간 미리보기 slide
$(document).ready(function(){
	$('.bxslider').bxSlider({
	  pagerCustom: '#bx-pager'})
});

//체크박스 하나만 선택
function oneCheckbox(a){
	var obj = document.getElementsByName("checkbox");
	for(var i=0; i<obj.length; i++){
		if(obj[i] != a){
			obj[i].checked = false;
		}
	}
}	

//header
$(function(){
	/* global var */
	var win = $(window),
		winHeight = win.height(),
		winWidth = win.width();
	
	/* ON LOAD */
	$(window).load(function() {
		setTimeout(function(){
			$("body").addClass("opacity");
		}, 0);
	
		var gnb = $(".navigation nav").html();
		$(".all_menu nav").html(gnb);
	});
	
	/* resize Fn */
	var delta = 0;
	var timer = null;
	
	function resizeFn(){
		winSize();
		winPcReset();
		gnbOpen();
	}
	$(window).on("resize",function(){
		clearTimeout( timer );
		timer = setTimeout( resizeFn, delta );
	});
	
	
	/* run */
	initFn();
	
	/* initFn */
	function initFn(){
	
		$(".skip_contents").click(function(){
			if($("#container").length >= 1){
				var t = $("#container").find(".content");
				t.attr("tabindex","-1");
				t.focus();
				return false;
			}else{
				$("#wrap").find("a").eq(0).focus();
			}
		});
	
		// resizeFn
		winSize();
		winPcReset();
		gnbOpen();
	
		// common
		menuOpen();
		headerSet();
		allmenuPop();
		sideMenuPos();
	}
	
	/* function : custom */
	// 01)common js
	function allmenuPop(){
		var popBtn = $(".all_menu_btn"),
			popLayer = $(".all_menu_layer_wrap"),
			popMask = $(".all_menu_mask");
		var closeBtn = $(".all_menu_close");
	
		popBtn.click(function(){
			$("body").addClass("popshow");
		});
		closeBtn.on("click", function(){
			$("body").removeClass("popshow");
			return false;
		});
	}
	
	function sideMenuPos(){
		sidemenu();
		$(".side_menu_btn").on("click", function(){
			$("body").toggleClass("sideMenu");
			return false;
		})
	
		function sidemenu(){
			if( !$("html").hasClass("mobile")){
				var a = $(".side_menu").height(),
					b = ($(".side_menu_box").height() - a) / 2;
				if( b > 0 ){
					$(".side_menu").css({"paddingTop":b});
				}else{
					$(".side_menu").css({"paddingTop":"0"});
				}
			}else{
				$(".side_menu").removeAttr("style");
			}
		}
	
		win.resize(function(){
			$(".side_menu").removeAttr("style");
			sidemenu();
		})
	}
	
	// viewport addclass : mobile or desktop
	function winSize(){
		if(win.width() <= 1224){
			$("html").removeClass("desktop").addClass("mobile");
		}else{
			$("html").removeClass("mobile").addClass("desktop");
		}
	}
	// viewport reset class
	function winPcReset(){
	
		if( !$("html").hasClass("mobile")){
			$("body, .header_menu_btn").removeClass("menu_open");
			$(".gnb, .gnb .submenu").removeAttr("style");
			$(".gnb > li").removeClass("toggle active");
	
			$("body").removeClass("sideMenu");
			$(".all_menu_mask, .all_menu_layer_wrap").removeClass("menu_open");
		}else{
			$("body").removeClass("popshow");
		}
	}
	// header menu button click
	function menuOpen(){
		var button = $(".header_menu_btn");
		var check = true;
	
		button.on("click", function(){
			if( check ){
				$("body").addClass("menu_open");
				$(this).addClass("menu_open");
				check = false;
			}else{
				setTimeout(function(){
					$("body").removeClass("menu_open");
				},200);
				$(this).removeClass("menu_open");
				check = true;
			}
		});
	}
	// gnb mobile menu open
	function gnbOpen(){
		if( $("html").hasClass("mobile") ){
			$(".gnb").unbind("mouseenter mouseleave");
			gnbMobile();
		}else{
			$(".gnb > li > a").unbind("click");
			$(".gnb").bind("mouseenter mouseleave");
			gnbPc();
		}
	
		function gnbMobile(){
			$(".gnb > li").each(function(){
				if($(this).find("ul").length>0){
					$(this).addClass("toggle");
				}
			})
			$(".gnb > li > a").unbind().bind("click", function(){
				if($(this).parent().find("ul").length > 0){
					$(this).parent().toggleClass("active");
					$(this).parent().find("ul").stop().slideToggle();
					return false;
				}
			})
		}
		function gnbPc(){
			$(".gnb").hover(function(){
				$("body").addClass("menu_open");
			},function(){
				$("body").removeClass("menu_open");
			});
		}
	}
	// header setting
	function headerSet(){
	
		// element
		var header = $("#header");
		var headerST = header.offset().top;
		var scrollBoolean;
		var scrollCur;
		var scrollEnd = 0;
		var scrollMove = 15;
	
		// init
		win.on("scroll", function(){
			scrollBoolean = true;
			headerSetEvent();
		})
	
		//header minimize fn
		setInterval(function(){
			if( scrollBoolean && !$("body").hasClass("active") ){
				scrollTure();
				scrollBoolean = false;
			}
		}, 50)
	
		function headerSetEvent(){
			if( !$("#container").length ) return false;
			if( win.scrollTop() > header.height() ){
				header.addClass("minimize");
			}else{
				header.removeClass("minimize");
			}
		}
	
		// header hide or show fn
		function scrollTure(){
			scrollCur = $(this).scrollTop();
			var $item = $("#container"),
				$itemSt = $item.offset().top;
	
			if( !$(".area_visual, .area_subVisual").length ) return false;
	
			if( scrollCur > scrollEnd ){
				// scrollCur(+) > 0 : scrollDown
				if( scrollCur > $itemSt - header.outerHeight() - 60 ){
					header.addClass("hide");
				}
			}
			else {
				// scrollCur < 0 : scrollUp
				if( scrollCur <= $itemSt - header.outerHeight() + 60 ){
					header.removeClass("hide");
				}
			}
			scrollEnd = scrollCur;
		}
	}
});

// banner
$(window).load(function(){
	if($(".banner_area").length > 0){
	 var banSlider = $('.banner_area .list').bxSlider();
	 var widthMatch = matchMedia("all and (max-width: 1500px)");
	 var widthHandler = function(matchList) {
	     if (matchList.matches) {
	    	 banSlider.reloadSlider({
	        	mode: 'horizontal',
	     		auto:true,
	     		autoHover:true,
	     		minSlides:1,
	     		maxSlides:3,
	     		moveSlides:1,
	     		slideWidth:160,
	     		slideMargin:10,
				pause:3000,
				speed:1000,
	     		pager:false,
	     		controls:true,
	     		autoControls:true,
	     		autoControlsCombine:true,
	         })
	     } else {
	    	 banSlider.reloadSlider({
	        	mode: 'horizontal',
		     		auto:true,
		     		autoHover:true,
		     		minSlides:1,
		     		maxSlides:6,
		     		moveSlides:1,
		     		slideWidth:182,
		     		slideMargin:15,
					pause:3000,
					speed:1000,
		     		pager:false,
		     		controls:true,
		     		autoControls:true,
		     		autoControlsCombine:true,
		         })
		     }
		 };
		 widthMatch.addListener(widthHandler);
		 widthHandler(widthMatch);
	}
});
