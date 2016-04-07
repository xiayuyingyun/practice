function getNewContent() {
	//将新创建的对象赋值给一个变量
	// var request = getHTTPObject();
	var request = new XMLHttpRequest();
	if (request) {
		//用open指定服务器将要访问的文件，请求类型，是否异步
		request.open("GET", "example.txt", true);
		//处理响应  指定请求目标  明确如何响应  用send方法来发送请求alert("dsafsd")
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById('new').appendChild(para);
			}
		};
		request.send(null);
	} else {
		alert('Sorry,your browser doesn\'t support XMLHttpRequest');
	}
}

addLoadEvent(getNewContent);       

