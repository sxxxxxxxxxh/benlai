;(function($){
	class Search{
		constructor() {
			this.tu = $(".tu-t")
			this.nm = $(".nm")
			this.cankao = $(".cankao")
			this.tips=$(".tips")
			this.price=$(".price")
			this.url="http://localhost/benlai-1/data/goods.json"
			
		    this.load()
		}
		load(){
			var result = decodeURIComponent(location.search)
			this.result = result.substring(1)
				var that=this;
				$.ajax({
					type:"get",
					url:this.url,
					success:function(res){
						that.res= res
						that.display()
					}
				})
			}
			
		
		display(){
			var str1="";
			var str2="";
			var str3="";
			var str4="";
			var str5="";
			for(var i=0;i<this.res.length;i++){
//				console.log(this.res)
				if(this.result == this.res[i].goodsId){
					console.log(this.res[i].goodsId)
					str1=`<div class="sbox">
							<img src="${this.res[i].url}" class="simg"/>
						</div>
						<div class="da  b_box">
							<img src="${this.res[i].url}"/>
						</div>
						<div class="tu-c" >
							<b></b>
							<div class="tu-c-c ">
								<img src="${this.res[i].url}"/>
							</div>
							
							<b></b>
						</div>`
					str2 = this.res[i].name
					var price2=parseInt(this.res[i].price/.6)
					str3 =`参考价：<span class="hua">￥${this.res[i].price}</span>`
					str4 =`商品编号：<span>${this.res[i].tip}</span>`
					str5 =`宾伦价：<span class="te">￥${this.res[i].price}</span>`
				}
				
			}
			this.tu.html(str1)
			this.nm.html(str2)
			this.cankao.html(str3)
			this.tips.html(str4)
			this.price.html(str5)
			this.addEvent()
		}
		addEvent(){
			this.sBox = document.querySelector(".sbox");
			this.bBox = document.querySelector(".b_box");
//			console.log(this.bBox)
			this.bImg = this.bBox.children[0];
			var that = this;
				this.sBox.onmouseenter = function(){
					that.show()
				}
				this.sBox.onmouseleave = function(){
					that.hide()	
				}
				this.sBox.onmousemove = function(eve){
					var e = eve || window.event
					that.move(e);
				}
		}
		show(){
			this.bBox.style.display = "block";
				if(!this.span){
					this.span = document.createElement("span");
					var w = this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth;
					var h = this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight;
					this.span.style.cssText = `width:${w}px;height:${h}px;background:rgba(200,200,200,0.6);position:absolute;left:0;top:0;`;
					this.sBox.appendChild(this.span);
				}
				this.span.style.display = "block";
		}
		hide(){
			this.span.style.display = "none";
			this.bBox.style.display = "none";
		}
		move(e){
			var l = e.pageX - this.sBox.offsetLeft - this.span.offsetWidth/2;
				var t = e.pageY - this.sBox.offsetTop - this.span.offsetHeight/2;
				if(l < 0) l=0;
				if(t < 0) t=0;
				if(l > this.sBox.offsetWidth - this.span.offsetWidth){
					l = this.sBox.offsetWidth - this.span.offsetWidth
				}
				if(t > this.sBox.offsetHeight - this.span.offsetHeight){
					t = this.sBox.offsetHeight - this.span.offsetHeight
				}
				this.span.style.left = l + "px";
				this.span.style.top = t + "px";
				var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
				var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);
				this.bImg.style.left = -x * (this.bImg.offsetWidth - this.bBox.offsetWidth) + "px";
				this.bImg.style.top = -y * (this.bImg.offsetHeight - this.bBox.offsetHeight) + "px";
		}
		
	}
	
	new Search()		
})(jQuery);