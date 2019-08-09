class list{
			constructor(){
				this.cont = document.querySelector("#content");
	            this.url = "http://localhost/benlai-1/data/goods.json";
	            
	            
	            this.load();
	            this.addEvent()
			}
			addEvent(){
				var that = this;
				this.cont.addEventListener("click",function(eve){
					if(eve.target.className == "btn"){
						that.id = eve.target.parentNode.getAttribute("qwe");
						that.setCookie()
					}
				})
				this.cont.addEventListener("click",function(eve){
					if(eve.target.className == "detail"){	
						that.id=eve.target.parentNode.parentNode.parentNode.getAttribute("qwe")
	//					var msg=getCookie("goods")
						that.res.some((resVal)=>{
							that.str=""
							if(that.id  == resVal.goodsId){
								that.str=resVal.goodsId
							}
							return that.str
						})
						document.location.href ='detail.html?'+that.str;
					}
				})
			}
			
		


			setCookie(){
				this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
				if(this.goods.length == 0){
					this.goods.push({
						id : this.id,
						num : 1
					})
				}else{
					var i = 0;
					var onoff = this.goods.some((val,index)=>{
						i = index;
                    	return val.id == this.id;
					})
					if(onoff){
						this.goods[i].num++
					}else{
							this.goods.push({
							id : this.id,
							num : 1
						})
					}
				}
				setCookie("goods",JSON.stringify(this.goods));
			}
			load(){
	            var that = this;
	            ajaxGet(this.url,function(res){
	                that.res = JSON.parse(res);
	                that.display();
	            })
	        }
			display(){
				var str = "";
					this.res.forEach((val)=>{
	                str += `<dl><dd><div class="box" qwe="${val.goodsId}">
								<p class="pic"><a href="##"><img src="${val.url}" class="detail"></a></p>
	                            <p class="name"><a href="##"><font class="detail">${val.name}</font><span>${val.tip}</span></a></p>
	                            <p class="price">￥${val.price}<span>￥${val.fprice}</span></p>
	                            <p class="cold">冷链配</p>
	                            <p class="btn" ></p>
	                        </div></dl></dd>`
	            })
					this.cont.innerHTML = str;
			}
		} 
		new list;
		
		;(function(){
			var msg = localStorage.getItem("loginUser");
				if(msg){
					$(".p1").hide();
					$(".p2").show();
					$(".p2").find("span").html(JSON.parse(msg).user);
				}else{
					$(".p1").show();
					$(".p2").hide();
				}
		
				$("#out").click(function(){
					localStorage.removeItem("loginUser");
					$(".p1").show();
					$(".p2").hide();
				})
				
				$("#cartcart").on("click",function(){
					if(msg){
						location.href = "cart.html";
					}else{
						if(confirm("请先登录")){
							location.href = "login.html";
						}
					}
				})
		})();
		
		function ajaxGet(url,success,data){
			data = data || {};
			var str = '';
			for(var i in data){
				str = str + i + "=" + data[i] + "&";
			}
			var d = new Date();
			url = url + "?" + str + "__qft="+d.getTime();
			var ajax = new XMLHttpRequest();
			ajax.open("get",url,true);
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4 && ajax.status == 200){
					success(ajax.responseText)
				}
			}
			ajax.send();
		}
		
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
		    return "";
		}