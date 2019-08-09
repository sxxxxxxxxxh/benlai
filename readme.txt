1.github或者svn的在线仓库地址:
	https://github.com/sxxxxxxxxxh/benlai/commits/master
2.首页的目录
	(shenxihang/)benlai-1/index.html
3.sass源文件的目录
	(shenxihang/)benlai-1/sass
4.模块化的主文件的目录
	(shenxihang/)benlai-1/js/detail.js（已改完全模块化）
5.项目的环境
	Apache	http://localhost/(shenxihang/)benlai-1/cart.html(网络)
6.页面上哪些东西可点
	首页：登录 注册、我的本来 购物车、nav所有  皆可跳转对应页面
		好评 新品、热卖爆款 鱼滋鱼味系列、好评热卖 牛气冲天系列 点击切换选项卡
		梯子 三级菜单 所有a标签滑动效果
	商品列表：加入购物车 可用，点击图片、名字可到对应商品详情界面
	商品详情：放大镜，上下按钮和输入框改变商品数量，加入购物车并跳转购物车界面
	
7.项目说明，一切你想说明的内容
	首页可以注册登录，注册要求有报错提示，登录注册界面互通，logo回首页
	所有页面识别登录信息，未登录无法访问购物车页面，自动跳转登录界面
	购物车界面：默认全选，操作改变数量或删除会改变小计并去掉对应勾选和全选，再次勾选或全选会重新合计金额