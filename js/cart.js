class Cart{
        constructor(){
            this.tbody = document.querySelector(".content");
			this.money = document.querySelector("#money");
			this.allprice = document.querySelector(".allprice");
			this.quanxuan = document.querySelector(".quanxuan");
			this.ccc = document.querySelector("#ccc");
            this.url = "http://localhost/benlai-1/data/goods.json";

            this.load();
            this.addEvent()
        }
        addEvent(){
            var that = this;
			this.ccc.addEventListener("change",function(){
				if(this.checked == true){
					that.display();
				}
			})
			this.quanxuan.addEventListener("click",function(){
					that.display();
			})
			
            this.tbody.addEventListener("click",function(eve){
                if(eve.target.className == "del"){
					that.ccc.checked = false;
					eve.target.parentNode.parentNode.firstElementChild.firstElementChild.checked=false
                    that.id = eve.target.parentNode.getAttribute("index");
                    eve.target.parentNode.remove();
                    that.changeCookie(function(i){
                        that.goods.splice(i,1)
                    });
                }
            })
			
            this.tbody.addEventListener("input",function(eve){
                if(eve.target.className == "num"){
					var p = eve.target.parentNode.parentNode.previousElementSibling.innerHTML.substr(1);
					that.ccc.checked = false;
					eve.target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.checked=false
					eve.target.parentNode.parentNode.nextElementSibling.innerHTML="￥"+ (p * eve.target.value).toFixed(2)
                    that.id = eve.target.parentNode.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function(i){
                        that.goods[i].num = eve.target.value;
                    });
                }
            })
        }
		sum(){
			
		}
        changeCookie(callback){
            var i = 0;
            this.goods.some((val,index)=>{
                i = index;
                return val.id == this.id;
            })
            callback(i);
            setCookie("goods",JSON.stringify(this.goods));
        }
        load(){
            var that = this;
            ajaxGet(this.url,function(res){
                that.res = JSON.parse(res);
                that.getCookie()
            })
        }
        getCookie(){
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];

            this.display();
        }
        display(){
            var str = "";
			var count = 0;
			var sum = 0;
            this.res.forEach((resVal)=>{
                this.goods.forEach((goodsVal)=>{
                    if(resVal.goodsId == goodsVal.id){
						count += goodsVal.num;
						sum += goodsVal.num * resVal.price
                        str += `<li index="${resVal.goodsId}">
                                    <div class="check">
                                    	<input type="checkbox"checked="checked" />
                                    </div>
                                    <div class="pic"><a href="detail.html"><img src="${resVal.url}" ></a></div>
                                    <div class="name">
                                    	<a href="detail.html">${resVal.name}</a>
                                    		<span>无会员折扣</span>
                                    </div>
                                    <div class="price">￥${resVal.price}</div>
                                    <div class="count">
                                    	
                                    	<p><input type="Number" class="num" value="${goodsVal.num}" min=1 /></p>
                                    	
                                    </div>
                                    <div class="xiaoji">￥${resVal.price*goodsVal.num}</div>
                                    <div class="opera">
                                    	<a href="##" class="del">删除</a>
                                    </div>
                                </li>`;
                    }
                })
            })
            this.tbody.innerHTML = str;
			this.money.innerHTML = sum.toFixed(2)
			this.allprice.innerHTML = `已选择${count}件商品，金额（包含运费）= <span>${(sum+10).toFixed(2)}元</span>`
        }
    }

    new Cart;

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
    // options默认参数的处理
    options = options || {};

    // options中expires默认的处理
    var date = "";
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        date = ";expires="+d;
    }

    // options中path默认的处理
    var path = options.path ? ";path="+options.path : "";

    // 当有效期和路径的默认处理结束后，可以设置cookie了
    document.cookie = key + "="+ value + date + path;
}

function removeCookie(key,options){
    // options默认参数的处理
    options = options || {};
    // 必须设置options中expires为-1
    options.expires = -1;
    // 借助设置cookie的方法，将options传过去
    setCookie(key,null,options)
}

function getCookie(key){
    // 获取所有cookie
    var str = document.cookie;
    // 第一次分割：每对cookie是一个数据
    var arr = str.split("; ");
    // 遍历每对cookie，再次分割：名字和值
    for(var i=0;i<arr.length;i++){
        // 根据名字
        if(arr[i].split("=")[0] == key){
            // 返回值
            return arr[i].split("=")[1];
        }
    }
    // 如果for循环结束后，函数还在执行，说明没有找到数据，返回空字符
    return "";
}