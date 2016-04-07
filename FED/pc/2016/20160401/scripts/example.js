// window.onload = function() {
// 	var testdiv = document.getElementById("testdiv");
// 	//一旦使用了innerHTML属性，它的全部都将被替换
// 	// testdiv.innerHTML = "<p>I inserted <em></em> content.</p>";
// 	//createElement只能创建元素节点    createTextNode创建文本节点
// 	var para = document.createElement("P");
// 	testdiv.appendChild(para);
// 	var txt = document.createTextNode("Hello world");
// 	para.appendChild(txt);
// }


// window.onload = function() {
// 	var para = document.createElement("p");
// 	var testdiv = document.getElementById("testdiv");
// 	testdiv.appendChild(para);
// 	var txt = document.createTextNode("Hello world");
// 	para.appendChild(txt);
// }
window.onload = function() {
	var para = document.createElement("p");
	var txt1 = document.createTextNode("This is");
	var emphasis = document.createElement("em");
	var txt2 = document.createTextNode("my");
	var txt3 = document.createTextNode(" content.");
	para.appendChild(txt1);
	emphasis.appendChild(txt2);
	para.appendChild(emphasis);
	para.appendChild(txt3);
	var testdiv = document.getElementById("testdiv");
	textdiv.appendChild(para);
	alert("textdiv");
}