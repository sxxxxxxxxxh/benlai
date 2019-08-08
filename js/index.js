	;(function(){

		$(".banner").banner({
					items:$(".banner").find("img"),        //必传
					left:$(".banner").find("#left"),       //可选
					right:$(".banner").find("#right"),     //可选
					autoPlay:true,                          //可选，默认有自动播放
					delayTime:2000,                         //可选，默认2000
					moveTime:1000,                          //可选，默认300
					index:0,                                //可选，默认0
				})
				
		;(function(){
			var msg = localStorage.getItem("loginUser");
				if(msg){
					$(".p1").hide();
					$(".p2").show();
					$(".p2").find("span").html(JSON.parse(msg).user);
				}else{
					$(".p1").show();
					$(".p2").hide();
				}

				$("#out").click(function(){
					localStorage.removeItem("loginUser");
					$(".p1").show();
					$(".p2").hide();
				})
		})();
					
		$(function(){
			
			$('#titi li').click(function(){
			
			 var t =$('.lou').eq($(this).index());
			 $("html").stop().animate({
			     scrollTop:t.offset().top
			 })	
			})
		})
		
		(function(){
			$(".topgoods").find("dl dt").bind("mouseenter",function(){
				this.addClass("on")
			})
			
			// var bigUl = document.getElementsByTagName('coul')
			// var list = document.getElementsByTagName('coli')
			// var divBox = document.getElementsByTagName('loul');
			// var divList = document.getElementsByClassName('loli')
			// for(let i = 0; i < list.length; i++) {
			// 	list[i].index = i;
			// 	list[i].onmouseenter = function() {
			// 		for(let j = 0; j < list.length; j++) {
			// 			list[j].className = '';
			// 			divList[j].style.display = 'none';
			// 			
			// 		}
			// 		divList[i].style.display = 'block';
			// 	}
			// }
		})

	})();