;(function(){
"use strict";

define(function(){
    class Switch{
		constructor(){
			this.msg = localStorage.getItem("loginUser");
			
			this.login();
			this.trunCart()
		}
		login(){
			if(this.msg){
				$(".p1").hide();
				$(".p2").show();
				$(".p2").find("span").html(JSON.parse(this.msg).user);
			}else{
				$(".p1").show();
				$(".p2").hide();
			}
			
			$("#out").click(function(){
				localStorage.removeItem("loginUser");
				$(".p1").show();
				$(".p2").hide();
			})
		}
		trunCart(){
			var that=this
			$("#addcart").on("click",function(){
				if(that.msg){
					location.href = "cart.html";
				}else{
					if(confirm("请先登录")){
						location.href = "login.html";
					}
				}
			})	
		}
    }



return Switch;

})
})();