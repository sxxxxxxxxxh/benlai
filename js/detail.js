;(function(){
	"use strict";
	
	
	require.config({
	    baseUrl:"module",
	    paths:{
	         jq:"../js/jquery.1.12.4",
	        con:"connect",
	        Maxing:"maxing"
			
	    }
	})
	
	require(["jq","con","Maxing"],(_,c,m)=>{

	    new c(function(){
			new m({
				// 
				sbox:$(".sbox"),
				simg:$(".sbox").find(".simg"),
				bbox:$(".bbox"),
				bimg:$(".bbox").find(".bimg")
			});
		});
		
	}) 
	
})();