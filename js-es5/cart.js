"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cart = function () {
    function Cart() {
        _classCallCheck(this, Cart);

        this.tbody = document.querySelector(".content");
        this.money = document.querySelector("#money");
        this.allprice = document.querySelector(".allprice");
        this.quanxuan = document.querySelector(".quanxuan");
        this.ccc = document.querySelector("#ccc");
        this.url = "http://localhost/benlai-1/data/goods.json";

        this.load();
        this.addEvent();
    }

    _createClass(Cart, [{
        key: "addEvent",
        value: function addEvent() {
            var that = this;
            this.ccc.addEventListener("change", function () {
                if (this.checked == true) {
                    that.display();
                }
            });
            this.quanxuan.addEventListener("click", function () {
                that.display();
            });

            this.tbody.addEventListener("click", function (eve) {
                if (eve.target.className == "del") {
                    that.id = eve.target.parentNode.getAttribute("index");
                    eve.target.parentNode.remove();
                    that.changeCookie(function (i) {
                        that.goods.splice(i, 1);
                    });
                }
            });

            this.tbody.addEventListener("input", function (eve) {
                if (eve.target.className == "num") {
                    that.ccc.checked = false;
                    that.id = eve.target.parentNode.parentNode.parentNode.getAttribute("index");
                    that.changeCookie(function (i) {
                        that.goods[i].num = eve.target.value;
                    });
                }
            });
        }
    }, {
        key: "sum",
        value: function sum() {}
    }, {
        key: "changeCookie",
        value: function changeCookie(callback) {
            var _this = this;

            var i = 0;
            this.goods.some(function (val, index) {
                i = index;
                return val.id == _this.id;
            });
            callback(i);
            setCookie("goods", JSON.stringify(this.goods));
        }
    }, {
        key: "load",
        value: function load() {
            var that = this;
            ajaxGet(this.url, function (res) {
                that.res = JSON.parse(res);
                that.getCookie();
            });
        }
    }, {
        key: "getCookie",
        value: function getCookie() {
            this.goods = _getCookie("goods") ? JSON.parse(_getCookie("goods")) : [];

            this.display();
        }
    }, {
        key: "display",
        value: function display() {
            var _this2 = this;

            var str = "";
            var count = 0;
            var sum = 0;
            this.res.forEach(function (resVal) {
                _this2.goods.forEach(function (goodsVal) {
                    if (resVal.goodsId == goodsVal.id) {
                        count += goodsVal.num;
                        sum += Math.round(goodsVal.num * resVal.price);
                        str += "<li index=\"" + resVal.goodsId + "\">\n                                    <div class=\"check\">\n                                    \t<input type=\"checkbox\"checked=\"checked\" />\n                                    </div>\n                                    <div class=\"pic\"><a href=\"detail.html\"><img src=\"" + resVal.url + "\" ></a></div>\n                                    <div class=\"name\">\n                                    \t<a href=\"detail.html\">" + resVal.name + "</a>\n                                    \t\t<span>\u65E0\u4F1A\u5458\u6298\u6263</span>\n                                    </div>\n                                    <div class=\"price\">\uFFE5" + resVal.price + "</div>\n                                    <div class=\"count\">\n                                    \t\n                                    \t<p><input type=\"Number\" class=\"num\" value=\"" + goodsVal.num + "\" min=1 /></p>\n                                    \t\n                                    </div>\n                                    <div class=\"xiaoji\">\uFFE5" + resVal.price * goodsVal.num + "</div>\n                                    <div class=\"opera\">\n                                    \t<a href=\"##\" class=\"del\">\u5220\u9664</a>\n                                    </div>\n                                </li>";
                    }
                });
            });
            this.tbody.innerHTML = str;
            this.money.innerHTML = sum;
            this.allprice.innerHTML = "\u5DF2\u9009\u62E9" + count + "\u4EF6\u5546\u54C1\uFF0C\u91D1\u989D\uFF08\u5305\u542B\u8FD0\u8D39\uFF09= <span>" + (sum + 10) + "</span>";
        }
    }]);

    return Cart;
}();

new Cart();

;(function () {
    var msg = localStorage.getItem("loginUser");
    if (msg) {
        $(".p1").hide();
        $(".p2").show();
        $(".p2").find("span").html(JSON.parse(msg).user);
    } else {
        $(".p1").show();
        $(".p2").hide();
    }

    $("#out").click(function () {
        localStorage.removeItem("loginUser");
        $(".p1").show();
        $(".p2").hide();
    });
})();

function ajaxGet(url, success, data) {
    data = data || {};
    var str = '';
    for (var i in data) {
        str = str + i + "=" + data[i] + "&";
    }
    var d = new Date();
    url = url + "?" + str + "__qft=" + d.getTime();
    var ajax = new XMLHttpRequest();
    ajax.open("get", url, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            success(ajax.responseText);
        }
    };
    ajax.send();
}
function setCookie(key, value, options) {
    // options默认参数的处理
    options = options || {};

    // options中expires默认的处理
    var date = "";
    if (options.expires) {
        var d = new Date();
        d.setDate(d.getDate() + options.expires);
        date = ";expires=" + d;
    }

    // options中path默认的处理
    var path = options.path ? ";path=" + options.path : "";

    // 当有效期和路径的默认处理结束后，可以设置cookie了
    document.cookie = key + "=" + value + date + path;
}

function removeCookie(key, options) {
    // options默认参数的处理
    options = options || {};
    // 必须设置options中expires为-1
    options.expires = -1;
    // 借助设置cookie的方法，将options传过去
    setCookie(key, null, options);
}

function _getCookie(key) {
    // 获取所有cookie
    var str = document.cookie;
    // 第一次分割：每对cookie是一个数据
    var arr = str.split("; ");
    // 遍历每对cookie，再次分割：名字和值
    for (var i = 0; i < arr.length; i++) {
        // 根据名字
        if (arr[i].split("=")[0] == key) {
            // 返回值
            return arr[i].split("=")[1];
        }
    }
    // 如果for循环结束后，函数还在执行，说明没有找到数据，返回空字符
    return "";
}