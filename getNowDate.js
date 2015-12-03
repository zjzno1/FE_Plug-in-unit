/**
 * 本插件适用于获得当前时间，并在有相应class的标签中显示
 * 使用本插件是请在之前引入jquery
 * @author  极昼空间
 * @E-mail abbottzjz@gmail.com  
 * @github https://github.com/zjzno1
 */

/**
 * 把getDay获取到的数字转换为中文
 */
function changeDayIntoChinese(day) {
	var cnWeekDay = ['','一','二','三','四','五','六','日'];
	return cnWeekDay[day];
}
/**
 * 可获取年、月、日、星期/*使用星期的话要在html代码中写入‘星期’两字*/
 */
function getNowDate() {
	var time = new Date();
	var day = time.getDay();
	var date = time.getDate();
	var month = time.getMonth()+1;
	var year = time.getFullYear();
	var d = changeDayIntoChinese(day);
		$('.year').html(year);
		$('.month').html(month);
		$('.date').html(date);
		$('.day').html(d);
}
$(function(){
	/*每隔1分钟获取一次时间*/
	setInterval(getNowDate,60000);
});