/*浏览器的名称与版本
document.write(navigator.appName+ "</p>");
document.write(navigator.appVersion+ "</p>");
document.write("navigator.appCodeName + "</p>");
document.write("navigator.platform + "</p>");
document.write("navigator.cookieEnablid + "</p>");
document.write(navigator.userAgent + "</p>");
document.write(navigator.browserLanguage + "</p>");
document.write(navigator.systemLanguage + "</p>");
document.write(navigator.userLanguage + "</p>");
*/
/*
var txt="Hello World!";
document.write(txt.length);

var txt="Hello World!";
document.write("<p>Big:" + txt.big() +"</p>");
document.write("<p>Small": + txt.small() +"</p>");
document.write("<p>Bold": + txt.bold() + "</p>");
document.write("<p>Italic": + txt.italics() + "</p>")
document.write(str.indexOf("world"));//首次出现的位置indexOf()方法
document.write(str.match("world!"))//查找字符串中特定的字符，若找到，则返回该字符-match()方
document.write(str.replace(/Microsoft/, "W3School"));
//replace()方法，前者是被替换的对象用，后者是替换者用”“ */

window.onload = function() {
	var oU1 = document.getElementById('ul1');
	// var str = '';

	console.time('hello');
	for(var i=0; i<5000; i++) {
		var oLi = document.createElement('li');
		oU1.appendChild(oLi);
	}
	// oDiv.innerHTML = str;
	console.timeEnd('hello');
};