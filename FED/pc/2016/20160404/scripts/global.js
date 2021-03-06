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


function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }

}


//给当前页面的body添加id
function highlightPage(href) {
    if (!document.getElementsByName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here";
            var linktext = links[i].innerHTML.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
    }
}
addLoadEvent(highlightPage);




function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_y) {
        var dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos = dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}




function getStyle(element, attr) {
    if (element.currentStyle) {
        return element.currentStyle[attr];
    } else {
        return getComputedStyle(element, false)[attr];
    }
}

function startMove(element, json, func) {
    var flag = true;
    clearInterval(element.timer);
    element.timer = setInterval(function() {
        for (var attr in json) {
            var iCurrent = 0;
            if (attr === "opacity") {
                iCurrent = Math.round(parseFloat(getStyle(element, attr)) * 100);
            } else {
                iCurrent = parseInt(getStyle(element, attr));
            }
            var iSpeed = (json[attr] - iCurrent) / 10;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCurrent != json[attr]) {
                flag = false;
                if (attr === "opacity") {
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else {
                    element.style[attr] = iCurrent + iSpeed + "px";
                }
            } else {
                flag = true;
            }
            if (flag) {
                clearInterval(element.timer);
                if (func) {
                    func();
                }
            }
        }
    }, 30);
}



function prepareSlideshow() {
    if (!document.getElementsByName) return false;
    if (!document.getElementById) return false;
    //intro找不到这个p 元素就返回false
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");

    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    intro.appendChild(slideshow);
    var links = document.getElementsByTagName("a");
    var destination;
    var _a = document.getElementById('preview');
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function() {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                startMove(_a, { 'left': '0' })
            }
            if (destination.indexOf("about.html") != -1) {
                startMove(_a, { 'left': '-150' })
            }
            if (destination.indexOf("photos.html") != -1) {
                startMove(_a, { 'left': '-300' })
            }
            if (destination.indexOf("live.html") != -1) {
                startMove(_a, { 'left': '-450' })
            }
            if (destination.indexOf("contact.html") != -1) {
                startMove(_a, { 'left': '-600' })
            }
        }
    }
}
addLoadEvent(prepareSlideshow);


//修改每个部分的display样式属性
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].id != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

// 在article中的nav所包含的链接被单击时调用showSection函数
function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute('href').split("#")[1];
        if (!document.getElementById(sectionId)) continue;

        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
        }
    }
}
addLoadEvent(prepareInternalnav);
