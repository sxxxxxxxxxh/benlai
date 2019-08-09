"use strict";

;(function () {
	//banner
	$(".banner").banner({
		items: $(".banner").find("img"), //必传
		left: $(".banner").find("#left"), //可选
		right: $(".banner").find("#right"), //可选
		autoPlay: true, //可选，默认有自动播放
		delayTime: 2000, //可选，默认2000
		moveTime: 1000, //可选，默认300
		index: 0 //可选，默认0
	})
	//登录		
	;(function () {
		var msg = localStorage.getItem("loginUser");
		if (msg) {
			$(".p1").hide();
			$(".p2").show();
			$(".p2").find("span").html(JSON.parse(msg).user);
		} else {
			$(".p1").show();
			$(".p2").hide();
		}

		$("#out").click(function () {
			localStorage.removeItem("loginUser");
			$(".p1").show();
			$(".p2").hide();
		});

		$("#cartcart").on("click", function () {
			if (msg) {
				location.href = "cart.html";
			} else {
				if (confirm("请先登录")) {
					location.href = "login.html";
				}
			}
		});
	})();
	//梯子			
	$(function () {

		$('#titi li').click(function () {

			var t = $('.lou').eq($(this).index());
			$("html").stop().animate({
				scrollTop: t.offset().top
			});
		});
	});
	//选项卡
	$(function () {
		$(".topgoods").find("dl dt").bind("click", function () {
			$(this).parent().parent().find("dl dt").removeClass("onn");
			$(this).parent().parent().find("dl dt").find("a").removeClass("on");
			$(this).parent().parent().find("dl dt").next(".ddd").hide();
			$(this).addClass("onn");
			$(this).find("a").addClass("on");
			$(this).next(".ddd").show();
		});

		$(".mai").find("dl dt").bind("click", function () {
			$(this).parent().parent().find("dl dt").removeClass("onon");
			// $(this).parent().parent().find("dl dt").find("a").removeClass("on");
			$(this).parent().parent().find("dl dt").next("dd").hide();
			$(this).addClass("onon");
			// $(this).find("a").addClass("on");
			$(this).next("dd").show();
		});
	});
})();