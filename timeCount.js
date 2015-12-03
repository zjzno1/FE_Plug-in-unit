/**
 * 本插件是倒计时插件，使用前请引入zepto.js
 * @author  极昼空间
 * @E-mail abbottzjz@gmail.com  
 * @github https://github.com/zjzno1
 */

function handleTimer(){
	$('.time').on('tap', countTimeHandler);

	function countTimeHandler(){
		$(this).off('tap');
		countTime.call(this);
	}
	function countTime(){
		var $this = $(this);
		var $timer = $this.find('.timer');
		var time = $timer.data('time');
		var interval = setInterval(reduceTime, 1000);
		function reduceTime(){
			var timeStr;
			console.log(time);
			if(time >= 0){
				timeStr = time + '秒'
			} else {
				clearInterval(interval);
				$this.on('tap', countTimeHandler);
				timeStr = '重新发送';
			}
			$timer.html(timeStr);
			time -= 1;
		}
	}
}

$(function(){
	handleTimer();
});