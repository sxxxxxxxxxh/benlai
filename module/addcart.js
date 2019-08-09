;(function(){
	
	define(function(){
		class Addcart{
			constructor(opt) {
			    this.up = opt.up;
				this.down = opt.down;
				this.s = opt.sumbuy;
				this.num = Math.round(this.s.val()); 
				this.cart = opt.cart;
				this.id = decodeURIComponent(location.search).substr(1)
				// this.add = this.clickAdd.bind(this)
				// this.leave = this.mouseLeave.bind(this)
				// this.move = this.mouseMove.bind(this)
				this.addEvent();
			}
			addEvent(){
				var that = this
				this.up.click(function(){
					that.num += 1
					that.s.val(that.num)
				})
				this.down.click(function(){
					if(that.num<=1){
						that.num = 1
					}else{
						that.num -= 1
						that.s.val(that.num)
					}	
				})	
				this.cart.click(function(){
					console.log(that.id)
					// that.s.val()
					that.setCookie()
				})
			}
			setCookie(){
				this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
				if(this.goods.length == 0){
					this.goods.push({
						id : this.id,
						num : this.s.val() 
					})
				}else{
					var i = 0;
					var onoff = this.goods.some((val,index)=>{
						i = index;
			        	return val.id == this.id;
					})
					if(onoff){
						this.goods[i].num +=  Math.round(this.s.val()) 
					}else{
							this.goods.push({
							id : this.id,
							num : this.s.val()
						})
					}
				}
				setCookie("goods",JSON.stringify(this.goods));
			}
			
			
			
			
		}
		
		
		return Addcart;
		
		function setCookie(key,value,options){
		    options = options || {};
		
		    var date = "";
		    if(options.expires){
		        var d = new Date();
		        d.setDate(d.getDate()+options.expires);
		        date = ";expires="+d;
		    }
		    var path = options.path ? ";path="+options.path : "";
		
		    document.cookie = key + "="+ value + date + path;
		}
		
		function removeCookie(key,options){
		    options = options || {};
		    
		    options.expires = -1;
		    
		    setCookie(key,null,options)
		}
		
		function getCookie(key){
		    var str = document.cookie;
		    var arr = str.split("; ");
		    for(var i=0;i<arr.length;i++){
		        if(arr[i].split("=")[0] == key){
		            return arr[i].split("=")[1];
		        }
		    }
		}
		    return "";
	})
})()