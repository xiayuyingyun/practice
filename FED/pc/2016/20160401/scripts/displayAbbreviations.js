function displayAbbreviations() {
	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length < 1) return false;
	var defs = new Array();
	for (var i=0; i<abbreviations.length; i++) {
		var current_abbr = abbreviations[i];
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.textValue;
		//把以上两个变量存到数组里  数组元素的键 数组元素的值
		defs[key] = definition;
	}
	var dlist = document.createElement("dl");
	//利用一个for／in循环把某个数组的下标健临时赋值给一个变量
	console.log('111111')
	console.log(defs)
	for (key in defs) {
		//对于defs关联数组里的每个键，把它的值赋给变量key
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		console.log(key)
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(dlist);
}

// window.onload = displayAbbreviations；
addLoadEvent(displayAbbreviations);