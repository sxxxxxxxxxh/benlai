
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