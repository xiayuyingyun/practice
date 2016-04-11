html body {hegiht : 100%} 不然内部的section 不能填充满

如何实现垂直不等高？
给父元素设置｛

display: flex;
	align-items: center;
	justify-content: center;
｝


给子元素设置｛

flex: 1;
	text-align: center;
｝

这样子元素里的所有东西都会水平居中



3.让a标签的before after 的元素居中

display：block;  width:   margin: 0 auto;



4.background-size  必须放在background-images后面  不然会不生

肖的


5.除数   ctrl + shift + y


6.getMonth()是从0开始计数的，要想得到当前的月份需要把获取结果+1


、、、、、、、、、、、、、、、
记得最后把列表页的logo加上。  
。。。。。。。。。。。。。。。。。。。


7.userAgent 判断微信 客户端 浏览器版本
function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
     } else {
        return false;
    }
}



8.另外不需要梁振英的图片做背景图，背景就是视频，进入页面后，直接播放视频哈

如果没有背景图，当挂断视频之后，全屏只有一个半透明黑色遮罩，会不会有点单调。


9.视频自动播放有问题？
