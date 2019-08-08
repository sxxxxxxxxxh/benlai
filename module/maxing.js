;(function(){

define(function(){
    class Maxing{
        constructor(opt){
		
	
			this.sbox = opt.sbox;
			this.bbox = opt.bbox;
			this.simg = opt.simg;
			this.bimg = opt.bimg;
		 
		
			this.enter = this.moveEnter.bind(this)
			this.leave = this.mouseLeave.bind(this)
			this.move = this.mouseMove.bind(this)
		  
			this.picurl = this.simg.attr("src")
			
			this.addEvent();
          
        }
		addEvent(){
			
			this.sbox.mouseenter(this.enter)
			this.sbox.mouseleave(this.leave)	
			this.sbox.mousemove(this.move)
		}
		
		moveEnter(){
			this.bbox.css({display:"block"})
			if(!this.span){
				this.span = $("<span>")
				var w = this.bbox.outerWidth() / this.bimg.outerWidth() * this.sbox.outerWidth();
				var h = this.bbox.outerHeight() / this.bimg.outerHeight() * this.sbox.outerHeight();
				this.span.css({
					width:w,
					height:h,
					background:"url("+this.picurl+")",
					backgroundSize:"500px 500px",
					position:"absolute",
					left:0,
					top:0,
					zIndex:20
				})
				this.sbox.append(this.span)
			}
			this.span.css({display:"block"})
			this.simg.css({opacity:0.6})
		}
		mouseLeave(){
			this.bbox.css("display","none")
			this.span.css("display","none")
			this.simg.css("opacity",1)
		}
		
	
		mouseMove(event){
				var l = event.pageX - this.sbox.offset().left - this.span.outerWidth() * 0.5;
				var t = event.pageY - this.sbox.offset().top - this.span.outerHeight() * 0.5;
				
				if(l<0) l=0;
				if(t<0) t=0;
				if(l > this.sbox.outerWidth() - this.span.outerWidth()){
					l = this.sbox.outerWidth() - this.span.outerWidth();
				}
				if(t > this.sbox.outerHeight() - this.span.outerHeight()){
					t = this.sbox.outerHeight() - this.span.outerHeight();
				}
				
				this.span.css({
					left:l,
					top:t
				})
				
				var x = l / (this.sbox.outerWidth() - this.span.outerWidth());
				var y = t / (this.sbox.outerHeight() - this.span.outerHeight());
				
				this.bimg.css({
					left:-x*(this.bimg.outerWidth()-this.bbox.outerWidth()),
					top:-y*(this.bimg.outerHeight()-this.bbox.outerHeight())
				})
				
				this.span.css("background-position",-l+"px "+-t+"px")
		}

}
return Maxing;
})


})();