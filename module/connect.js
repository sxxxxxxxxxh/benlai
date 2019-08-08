;(function(){
"use strict";

define(function(){
    class Con{
    constructor(fn){
		this.pic = $(".goodspic")
		this.index = $(".goodsnum")
		this.n = $(".introname")
		this.price = $(".price")
        this.url="http://localhost/benlai-1/data/goods.json"
		this.fn = fn
        this.load();
        
    }

    load(){
		var result = decodeURIComponent(location.search)
		this.result = result.substring(1)
			var that=this;
			$.ajax({
				type:"get",
				url:this.url,
				success:function(res){
					that.res= res;
					console.log(res);
					that.display();
					that.fn();
				}
			})
		}
	
	display(){
		var str1="";
		var str2="";
		var str3="";
		var str4="";
		for(var i=0;i<this.res.length;i++){
//				console.log(this.res)
			if(this.result == this.res[i].goodsId){
				console.log(this.res[i].goodsId)
				str1=`<dl>
						<dt><a href="##" class="up" id="bt1"></a></dt>
						<dd>
							<a href="##" class="on"><img src="${this.res[i].url}" ></a>
							<a href="##"><img src="https://image7.benlailife.com/ProductImages/000/000/348/225/small/fca5cdd9-1303-4d45-b6c7-d28e3b91cac6.jpg?imageView2/2/format/webp" ></a>
							<a href="##"><img src="https://image7.benlailife.com/ProductImages/000/000/348/225/small/b0a25119-dc48-4a43-94ae-13435c75baef.jpg?imageView2/2/format/webp" ></a>
						</dd>
						<dt><a href="##" class="down" id="bt2"></a></dt>
					</dl>
					
					<div class="sbox">
						<img class="simg" src="${this.res[i].url}" >
					</div>
					<div class="bbox">
						<img class="bimg" src="${this.res[i].url}" >
					</div>`
				str3 = `<h1>${this.res[i].name}</h1>
							<p>${this.res[i].tip}</p>`
				str2 =	`商品编号：
					<span>${this.res[i].goodsId}</span>`		
				str4 =`￥${this.res[i].price}
					<span>￥${this.res[i].fprice}</span>`
			}
			
		}
		this.pic.html(str1)
		this.index.html(str2)
		this.n.html(str3)
		this.price.html(str4)
		
		
	}
}


return Con;

})
})();