"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var list = function () {
	function list() {
		_classCallCheck(this, list);

		this.cont = document.querySelector("#content");
		this.url = "http://localhost/benlai-1/data/goods.json";

		this.load();
		this.addEvent();
	}

	_createClass(list, [{
		key: "addEvent",
		value: function addEvent() {
			var that = this;
			this.cont.addEventListener("click", function (eve) {
				if (eve.target.className == "btn") {
					that.id = eve.target.parentNode.getAttribute("qwe");
					that.setCookie();
				}
			});
			this.cont.addEventListener("click", function (eve) {
				if (eve.target.className == "detail") {
					that.id = eve.target.parentNode.parentNode.parentNode.getAttribute("qwe");
					//					var msg=getCookie("goods")
					that.res.some(function (resVal) {
						that.str = "";
						if (that.id == resVal.goodsId) {
							that.str = resVal.goodsId;
						}
						return that.str;
					});
					document.location.href = 'detail.html?' + that.str;
				}
			});
		}
	}, {
		key: "setCookie",
		value: function setCookie() {
			var _this = this;

			this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
			if (this.goods.length == 0) {
				this.goods.push({
					id: this.id,
					num: 1
				});
			} else {
				var i = 0;
				var onoff = this.goods.some(function (val, index) {
					i = index;
					return val.id == _this.id;
				});
				if (onoff) {
					this.goods[i].num++;
				} else {
					this.goods.push({
						id: this.id,
						num: 1
					});
				}
			}
			_setCookie("goods", JSON.stringify(this.goods));
		}
	}, {
		key: "load",
		value: function load() {
			var that = this;
			ajaxGet(this.url, function (res) {
				that.res = JSON.parse(res);
				that.display();
			});
		}
	}, {
		key: "display",
		value: function display() {
			var str = "";
			this.res.forEach(function (val) {
				str += "<dl><dd><div class=\"box\" qwe=\"" + val.goodsId + "\">\n\t\t\t\t\t\t\t\t<p class=\"pic\"><a href=\"##\"><img src=\"" + val.url + "\" class=\"detail\"></a></p>\n\t                            <p class=\"name\"><a href=\"##\"><font class=\"detail\">" + val.name + "</font><span>" + val.tip + "</span></a></p>\n\t                            <p class=\"price\">\uFFE5" + val.price + "<span>\uFFE5" + val.fprice + "</span></p>\n\t                            <p class=\"cold\">\u51B7\u94FE\u914D</p>\n\t                            <p class=\"btn\" ></p>\n\t                        </div></dl></dd>";
			});
			this.cont.innerHTML = str;
		}
	}]);

	return list;
}();

new list();

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

function _setCookie(key, value, options) {
	options = options || {};

	var date = "";
	if (options.expires) {
		var d = new Date();
		d.setDate(d.getDate() + options.expires);
		date = ";expires=" + d;
	}
	var path = options.path ? ";path=" + options.path : "";

	document.cookie = key + "=" + value + date + path;
}

function removeCookie(key, options) {
	options = options || {};

	options.expires = -1;

	_setCookie(key, null, options);
}

function getCookie(key) {
	var str = document.cookie;
	var arr = str.split("; ");
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].split("=")[0] == key) {
			return arr[i].split("=")[1];
		}
	}
	return "";
}