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
						console.log(that.id)
						that.setCookie()
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
								<p class="pic"><a href="##"><img src="${val.url}" ></a></p>
	                            <p class="name"><a href="##"><font>${val.name}</font><span>${val.tip}</span></a></p>
	                            <p class="price">${val.price}<span>${val.fprice}</span></p>
	                            <p class="cold">冷链配</p>
	                            <p class="btn"><a href="##"></a></p>
	                        </div></dl></dd>`
	            })
					this.cont.innerHTML = str;
			}
		} 
		new list;
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