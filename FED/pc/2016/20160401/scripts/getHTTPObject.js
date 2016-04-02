//通过对象检测技术，创建一个新的XMLHttpRequest对象
function getHTTPObject() {
	if (typeof XMLHttpRequest == "underfined");
	XMLHttpRequest = function () {
		try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch (e) {}
		try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch (e) {}
		try {return new ActiveXObject("Msxml2.XMLHTTP");}
			catch (e) {} 
		return false;
	}
	return new XMLHttpRequest();
}



