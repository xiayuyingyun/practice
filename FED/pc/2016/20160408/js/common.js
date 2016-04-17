;
(function() {
	//列表页逻辑业务
	if (!document.getElementById("wrap")) {
		return false;
	}
	//获取相关元素
	var todayTime = document.querySelector("#time");
	var monthDay = document.querySelector("#date");
	var conTime = document.querySelector('#conTime');
	var conShare = document.querySelector('#conShare');
	var conHangUp = document.querySelector('#conHangUp');
	var conPic = document.querySelector('#conPic');
	var videoTele = document.querySelector('#videoTele');
	var maskLayer = document.querySelector('#maskLayer');
	var maskWeixin =document.querySelector('#maskWeixin');
	var maskPeopleDaily = document.querySelector('#maskPeopleDaily');
	var wrap = document.querySelector('#wrap');
	var list = document.querySelector('#list');
	var conOthers = document.querySelector('.conOthers');

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

	// 点击列表元素，进入到视频通话页面
	list.addEventListener("click",function(e) {
		var e = event || window.event;
		 e.stopPropagation();
		if(getParents(e.target, "A")){
			wrap.classList.add('none');
			facetime.classList.remove('none');
		}
	});

	function getParents(obj, eleName) {
		while(obj) {
			if(obj.nodeName = eleName) return true;
			obj.parentNode.nodeName !== eleName;
			obj = obj.parentNode;
		}
	}

	// 视频通话页逻辑业务
	//通话时间计时
	function startTele() {
		var ss = mm = hh = 0;
		var inTime = setInterval(function() {
			var str= '';
			if (ss < 60) {
				ss++;
			} else {
				if (mm < 60) {
					mm++;
				} else {
					hh++;
					mm = 0;
				}
				ss = 0;
			}
			//当时、分、秒小于10时，给其前面加0
			str += (hh == 0) ? hh = '' : ((hh < 10) ? '0' + hh + ':' : hh + ':');
			str += (mm < 10) ? '0' + mm + ':' : mm + ':';
			str += (ss < 10) ? '0' + ss : ss;
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
				startTele();
			}, 1000);
			
			
		} else {
			this.classList.remove('conHangDown');
			conTime.classList.add('none');
			this.innerHTML = '接通';
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

	// 点击打给别人跳转到列表页
	conOthers.onclick = function() {
		facetime.classList.add('none');
		wrap.classList.remove('none');
	}

	maskLayer.addEventListener('click', function(){
		this.classList.add('none')
	})

})()
