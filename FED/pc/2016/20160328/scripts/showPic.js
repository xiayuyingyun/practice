function showPic (whichpic) {
	var sourse = whichpic.getAttribute("data-img");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", sourse);
	var text = whichpic.getAttribute("title");
	var description = document.getElementById("description");
	description.firstChild.nodeValue = text;
	//获取p元素里的第一个文本节点
}


function countBodyChildren() {
	var body_element = document.getElementsByTagName("body")[0];
	// alert (body_element.nodeType);
}
window.onload = countBodyChildren;
//页面加载是执行