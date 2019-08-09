;(function(){
	"use strict";
	
	
	require.config({
	    baseUrl:"module",
	    paths:{
	        jq:"../js/jquery.1.12.4",
	        con:"connect",
	        Maxing:"maxing",
			addcart:"addcart",
			switch:"switch"
	    }
	})
	
	require(["jq","con","Maxing","addcart","switch"],(_,c,m,a,s)=>{
		
	    new c(function(){
			new m({
				sbox:$(".sbox"),
				simg:$(".sbox").find(".simg"),
				bbox:$(".bbox"),
				bimg:$(".bbox").find(".bimg")
			});
		});
		
		new s;
		
		new a({
			up:$("#up"),
			down:$("#down"),
			sumbuy:$("#sumbuy"),
			cart:$("#addcart")
		});
		
	})
	
})();