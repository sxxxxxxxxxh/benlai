;(function(){
	
	define(function(){
		class Addcart{
			constructor(opt) {
			    this.up = opt.up;
				this.down = opt.down;
				this.s = opt.sumbuy
				
				this.add = this.clickAdd.bind(this)
				this.leave = this.mouseLeave.bind(this)
				this.move = this.mouseMove.bind(this)
				
				addEvent();
			}
			addEvent(){
			this.up.click(this.enter)
			this.down.click(this.leave)	
			this.sbox.mousemove(this.move)
			}	
			clickAdd(){
				
			}	
			
			
			
			
		}
		
		
		
		
	})
})()