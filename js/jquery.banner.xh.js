;(function($){
	"uesr strict";
	
	$.fn.banner = function(options){
		var that = this;
		var ban = {};
		ban.list = options.list === false ? false : true;
		ban.autoPlay = options.autoPlay === false ? false : true;
		ban.delayTime = options.delayTime || 3000;
		ban.moveTime = options.moveTime || 500;
		
		if(options.index >= 0 && options.index <= options.items.length-1){
			ban.index = options.index;
		}else if(options.index > options.items.length-1){
			ban.index = options.items.length-1;
		}else{
			ban.index = 0;
		}
		
		ban.iPrev = null;
		
		ban.init = function(){
			if(!ban.list) return;
			this.ul = $("<ul>");
			var str = "";
			for(var i = 0;i < options.items.length;i++){
				str += `<li>${options.items[i].alt}</li>`
			}
			this.ul.html(str);
			this.div = $("<div>");
			that.append(this.div);
			this.div.append(this.ul);
			
			this.div.css({
				margin:"0 auto",
				width: 1200,
				})
				
			this.ul.css({
				width: 990,
				paddingLeft: 210,
				height:30,
				lineHeight:"30px",
				
				position:"absolute",
				bottom:0,
				
				listStyle:"none",
				textAlign:"center",
				font:"400 14px/30px 'Microsoft YaHei'"
			}).children("li").css({
				cursor: "pointer",
				float:"left",
				width: 163,
				backgroundColor:"rgba(200,200,200,0.6)",
				marginLeft: 2
			}).eq(ban.index).css({
			    backgroundColor:"#91be16",
				color:"#fff"
			})
			this.listAction();
		}
		
		ban.listAction = function(){
			var _this = this;
			this.ul.children("li").mouseenter(function(){
				if($(this).index() > _this.index){
					_this.listMove(1,$(this).index())
				}else if($(this).index() < _this.index){
					_this.listMove(-1,$(this).index())
				}
				_this.index = $(this).index();
				_this.ul.children("li").css({
				    backgroundColor:"",
				    color:""
				}).eq(_this.index).css({
				    backgroundColor:"#91be16",
				    color:"#fff"
				})
			})	
		}
		
		ban.listMove = function(type,iNow){
			options.items.eq(this.index).css({
				left:0
			}).stop().animate({
				left:-options.items.eq(0).width() * type
			},this.moveTime).end().eq(iNow).css({
				left:options.items.eq(0).width() * type
			}).stop().animate({
				left:0
			},this.moveTime)
		}
		
		ban.btnActive = function(){
			if(!(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0)) return;
			
			options.left.on("click",this.leftClick.bind(this))
			options.right.on("click",this.rightClick.bind(this))	
		}
		
		ban.leftClick = function(){
			if(this.index == 0){
				this.index = options.items.length-1;
				this.iPrev = 0;
			}else{
				this.index--;
				this.iPrev = this.index+1;
			}
			this.btnMove(-1);
		}
		
		ban.rightClick = function(){
			if(this.index == options.items.length-1){
				this.index = 0;
				this.iPrev = options.items.length-1;
			}else{
				this.index++;
				this.iPrev = this.index-1;
			}
			this.btnMove(1);
		}
		
		ban.btnMove = function(type){
			options.items.eq(this.iPrev).css({
			    left:0
			}).stop().animate({
			    left:-options.items.eq(0).width() * type
			},this.moveTime).end().eq(this.index).css({
			    left:options.items.eq(0).width() * type
			}).stop().animate({
			    left:0
			},this.moveTime)
			
			if(!this.list) return ;
			this.ul.children("li").css({
			    backgroundColor:"",
			    color:""
			}).eq(this.index).css({
			    backgroundColor:"#91be16",
			    color:"#fff"
			})
		}
		
		ban.autoAction = function(){
			var _this = this;
			if(!ban.autoPlay) return;
			this.t = setInterval(()=>{
				this.rightClick();
			},this.delayTime);
			
			// console.log(that);
			that.hover(function(){
				clearInterval(_this.t)
			},function(){
				_this.t = setInterval(()=>{
					_this.rightClick();
				},_this.delayTime);
			})
		}
		
		ban.init();
		ban.btnActive();
		ban.autoAction();
	}	
})(jQuery);