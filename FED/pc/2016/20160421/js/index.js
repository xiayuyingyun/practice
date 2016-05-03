;
window.addEventListener('load', shuf());


function shuf() {
    var eUl = document.querySelector('.shuffling'),
        eLi = document.querySelectorAll('.shuf_pic'),
        bodyWidth = document.documentElement.offsetWidth,
        number = eLi.length,
        index = 1;

        function showButton() {
            bottons[index - 1].className = "on";
        }

        function animate(offset) {
            var newLeft = parseInt(eUl.style.left) + offset
            list.style.left = newLeft +"px";
            if (newLeft > -bodyWidth) {
                list.style.left = -number * bodyWidth + "px";
            }
            if (newLeft < -number * bodyWidth ) {
                list.style.left = -bodyWidth + "px";
            }
        }

        function next() {
            index += 1;
            showButton();
             animate(- bodyWidth);
        }
        function prex() {
            index -=1;
            showButton();
            animate(bodyWidth);
        }

    for (var i = 0; i < number; i++) {
        eLi[i].style.width = bodyWidth + "px";
        eUl.style.width = (number + 1) * bodyWidth + "px";
        console.log(eUl.style.width);
        eLi[i].ontouchstart = function(e) {
            mx = e.touchs[0].pageX;
        }
        eLi[i].ontouchend = function(e) {
            if(mx - e.touchs[0].pageX > 10) {
                prex();}
            // } else (e.touchs[0].pageX - mx > 10) {
            //     next();
            // }
        }
    }
}



    // eLi[i].addEventListener('touchmove', function(event) {
        //     if (event.targetTouches.length == 1) {
        //         event.preventDefault();//阻止浏览器默认事件，重要
        //         var touch = event.targetTouches[0];
        //         eLi.style.left = touch.pageX-50 + "px";
        //         eLi.style.top = touch.pageY-50 + "px";

        //     }
        // }, false);