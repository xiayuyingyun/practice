//页面加载完毕时执行函数，将把那些在页面加载完毕时执行的函数创建一个队列
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}



function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}




function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if (!document.getElementById("description")) return flase;
	if (whichpic.getAttribute("title")) {
		var text = whichpic.getAttribute("title");
	} else {
		var text = "";
	}
		//只有通过这项检查，负责修改图片说明文字的代码才会生效
		//var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	}
	return false;    
}


//把有关操作关联到onclick事件上
function prepareGallery() {
	//检查工作
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	//创建变量
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i=0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this);
		}
		links[i].onkeypress = links[i].onclick;
	}
}






function preparePlaceholder()  {
	// if (!document.createElement) return false;
	// if (!document.createTextNode) return false;
	// if (!document.getElementById) return false;
	// if (!document.getElementById("imagegallery")) return flase;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an images");
	description.appendChild(desctext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
 }



addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);




// document.getElementByTagName("body")[0].appendChild(placeholder);
// document.getElementByTagName("body")[0].appendChild(description);
// document.body.appendChild(placeholder);
// document.body.appendChild(desctiption);
// gallery.parentNode.insertBefore(description,gallery);




















