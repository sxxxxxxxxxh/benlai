class Register{
        constructor(){
            // 注册的接口
            this.url = "http://api.icodeilife.cn:81/user";
            // 获取元素
            this.phone = $("#phone");
			this.phoneerr = $("#phoneerr");
			this.code = $("#code");
			this.getcode = $("#getcode");
			this.codeerr = $("#codeerr");
            this.pass = $("#pass");
			this.passerr = $("#passerr");
			this.passs = $("#passs");
			this.passserr = $("#passserr");
			this.choose = $("#choose");
            this.btn = $("#registerbtn");
			this.chooseberr = $("#chooseberr");
			this.ben = $("#ben");
			this.bg = $("#sbg");
			this.text = $("#sword");
			this.cont = $(".slide");
			this.word = $(".word");
			
			this.onoff = this.telonoff = this.passoff = this.codeonoff = this.passsoff = this.checkonoff =false;
            // 绑定点击事件
            this.addEvent();
        }
        addEvent(){
            var that = this;
			this.phone.focus(function(){
				that.phone.val("")
			})
			this.phone.blur(function(){
				that.checkPhone()
			})
			this.ben.mousedown(function(eve){
				that.checkMouse(eve)
			})
			this.code.focus(function(){
				that.code.val("")
			})
			this.getcode.click(function(){
				that.getCode()
			})
			this.pass.blur(function(){
				that.checkPass()
			})
			this.passs.blur(function(){
				that.checkPasss()
			})
			this.choose.change(function(){
				that.checked()
			})
			
            this.btn.click(function(){
                that.load()
            })
        }
		
		checkPhone(){
			var re = /^1(3|4|5|7|8)\d{9}$/;
			if(this.phone.val() == ""){
				this.phone.parent().children("s").eq(0).addClass("no");
				this.phoneerr.html("请输入手机号")
			}else if(re.test(this.phone.val())){
			    this.phone.parent().children("s").eq(0).addClass("yes").removeClass("no")
			    this.phoneerr.html("")
			    this.telonoff = true;
				console.log(this.telonoff)
			}else{
				this.phone.parent().children("s").eq(0).addClass("no");
				this.phoneerr.html("请输入正确的手机号")
				this.telonoff = false;
			}
		}
		checkMouse(eve){
			var str = this.cont.width()- this.ben.width();
			var downX = event.clientX;
			var that=this;
			$(document).mousemove(function(eve){
			    var moveX = event.clientX;
			    var offsetX = moveX - downX;
			
			    if (offsetX > str) {
			        offsetX = str;
			    } else if (offsetX < 0) {
			        offsetX = 0;
			    }
			    that.ben[0].style.left = offsetX + "px";
			    that.bg[0].style.width = offsetX + "px";
			
			    if (offsetX == str) {
			        that.text.html("验证通过");
			        that.text[0].style.color = "#fff";
			        that.ben.addClass("yes");
			        that.onoff = true;
					
			        that.ben.unbind('mousedown')
			        $(document).unbind('mousemove')
			    }
			})
			
			$(document).mouseup(function (eve) {
			    if (that.onoff) {
			        return;
			    } else {
					that.btn[0].style.left = 0;
			        that.bg[0].style.width = 0;
			    }
			    $(document).unbind('mousemove')
			    $(document).unbind('mouseup')
			})
		}
		getCode(){
			var str = ""
			for(var i=0;i<4;i++){
				str += Math.round(Math.random()*9)
			}
			this.getcode.html(str);
			var that = this
			this.code.blur(function(){
				that.checkCode()
			})
		}
		checkCode(){
			if(this.code.val() == ""){
				this.codeerr.html("请输入验证码")
			}else if(this.code.val() == this.getcode.html()){
			    this.codeerr.html("")
			    this.codeonoff = true;
			}else{
				this.codeerr.html("请输入正确的验证码")
				this.codeonoff = false;
			}
		}
		checkPass(){
			var re = /^\w{8,16}$/;
			if(this.pass.val() == ""){
				this.pass.parent().children("s").eq(0).addClass("no");
				this.passerr.html("请输入密码")
			}else if(re.test(this.pass.val())){
			    this.pass.parent().children("s").eq(0).addClass("yes").removeClass("no")
			    this.passerr.html("")
			    this.passonoff = true;
				console.log(this.passonoff);
			}else{
				this.pass.parent().children("s").eq(0).addClass("no");
				this.passerr.html("密码须为8-16位字母,数字,半角符号")
				this.passonoff = false;return;
			}
			this.checkPasss()
		}
        checkPasss(){
        	if(this.passs.val() == this.pass.val()){
        	    this.passs.parent().children("s").eq(0).addClass("yes").removeClass("no")
        	    this.passserr.html("")
        	    this.passsonoff = true;
				console.log(this.passsonoff);return;
        	}else{
        		this.passs.parent().children("s").eq(0).addClass("no");
        		this.passserr.html("两次输入的密码不一致！")
        		this.passsonoff = false;return;
        	}
        }
		checked(){
			if(this.choose[0].checked){
				this.btn.removeClass("no");
				this.checkonoff = true;
			}else{
				this.btn.addClass("no");
				this.checkonoff = false;
			}
		}
		load(){
			console.log(this.onoff,this.telonoff ,this.passoff,this.passsoff, this.codeonoff , this.checkonoff,this.pass.val())
            if (this.onoff && this.telonoff && this.codeonoff  && this.checkonoff) {
                $.ajax({
                    url:this.url,
                    data:{
                        type:"register",
                        user:this.phone.val(),
                        pass:this.pass.val()
                    },
                    success:(res)=>{
                        res = JSON.parse(res);
                        // console.log(res);
                        if(res.code == 0){
                            this.word.html("注册失败，请重新注册");
                        }else if(res.code == 1){
                            this.word.html("注册成功，5秒后跳转到<a href='login.html'>登录</a>");
                            setTimeout(() => {
                                location.href = "login.html"
                            }, 5000);
                        }
                    }
                })
            } else {
                this.chooseberr.html("注册信息有误，请仔细检查！")
            }
            
        }
    }
    
    new Register();