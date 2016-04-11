;
//列表页逻辑业务
(function() {
	if (!document.getElementById("wrap")) {
		return false;
	}
	//获取相关元素
	var todayTime = document.getElementById('time');
	var monthDay = document.getElementById('date');

	//获取当前的时间并实时显示
	(function startTime() {
		var today = new Date()
		var h = today.getHours();
		var m = today.getMinutes();
		if( m < 10) {
			m = "0" + m;
			return m;
		}
		todayTime.innerHTML = h + ":" + m;
	})();


	//更新今日的日期
	(function todayDay() {
		var today = new Date();
		var month = today.getMonth();
		var day = today.getDate();
		monthDay.innerHTML = month + 1 + "月" + day + "日";
	})();
})()




// 视频通话页逻辑业务 
;(function() {
	//获取元素
	var conTime = document.getElementById('conTime');
	var conShare = document.getElementById('conShare');
	var conHangUp = document.getElementById('conHangUp');
	var conPic = document.getElementById('conPic');
	var videoTele = document.getElementById('videoTele');
	var maskLayer = document.getElementById('maskLayer');
	var maskWeixin =document.getElementById('maskWeixin');
	var maskPeopleDaily = document.getElementById('maskPeopleDaily');

	// var inTime;	
	//通话时间计时
	function startTele() {
		var s = m = h = 0;
		var inTime = setInterval(function() {
			var str= '';
			if (s < 60) {
				s++;
			} else {
				if (m < 60) {
					m++;
				} else {
					h++;
					m = 0;
				}
				s = 0;
			}
			//当时、分、秒小于10时，给其前面加0
			str += (h == 0) ? h = '' : ((h < 10) ? '0' + h + ':' : h + ':');
			str += (m < 10) ? '0' + m + ':' : m + ':';
			str += (s < 10) ? '0' + s : s;
			conTime.innerHTML = str;
		},1000)
	}

	// 拨通与挂断
	conHangUp.onclick = function() {
		if (!this.classList.contains('conHangDown')) {
			this.classList.add('conHangDown');
			conTime.classList.remove('none');
			this.innerHTML = '挂断';

			setTimeout(function(){
				conPic.classList.add('none');
				startTele();
			}, 1000);
			
			
		} else {
			this.classList.remove('conHangDown');
			this.classList.add('none');
			conTime.classList.add('none');
			conPic.classList.remove('none');
		}
	}

	//引导分享
	conShare.onclick = function() {
		maskLayer.classList.remove('none');
		var ua= navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			maskWeixin.classList.remove('none');
		} else if(ua.match(/rmrb/i) == "rmrb") {
			maskPeopleDaily.classList.remove('none');
		} else {
			maskPeopleDaily.classList.remove('none');
		}
	}


})()


// function is_weixin(){
//     var ua = navigator.userAgent.toLowerCase();
//     if(ua.match(/MicroMessenger/i)=="micromessenger") {
//         return true;
//      } else {
//         return false;
//     }
// }