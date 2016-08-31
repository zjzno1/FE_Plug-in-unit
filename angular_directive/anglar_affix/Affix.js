/**
 * author zjzno1
 * date: 2016/8/30
 * 
 * 指令使用方法：
 * 在需要固钉的元素上加上 affix属性或者在class中加上affix
 * 传入值为一个对象，如下：
 * option={offTop:"0px",offBottom:"50px"}
 * offTop为固定的元素距离浏览器顶部的距离
 * offBottom为固定的元素距离浏览器底部的距离
 * 不用的属性可以省略不写
 */
app = angular.module('myApp',[]);
app.directive('affix',['$timeout', function ($timeout) {
	return {
		restrict: 'AC',
		scope: {
			option:'='
		},
		link: function (scope, element, attrs) {
			$timeout(function () {
			    var jTop = element.offset().top, //元素在文档中竖直方向距离顶部的距离
			    	// jLeft = element.offset().left, //元素在文档中水平方向距离左部的距离
				    offTopNum = parseInt(scope.option.offTop),
				    offBottomNum = parseInt(scope.option.offBottom),
				    browserHeight = $(window).height(), //获取浏览器的高度
				    eleMarginTop = element.css('margin-top'), //获取子元素的margin-top
				    eleHeight = element.css('height'), //获取子元素的高度
				    eleHeightNum = parseInt(eleHeight);

				var eleParent = $('<div></div>'); //为affix创造占位元素
				eleParent.css('height',eleHeight);
				eleParent.css('margin-top',eleMarginTop);
				eleParent.css('display','none');
				element.after(eleParent);
				console.log(eleParent.css('display'))

				var t = document.documentElement.scrollTop || document.body.scrollTop; //滚动条竖直方向滚动的距离
				//bottom判断
				if (t <= (jTop-browserHeight+offBottomNum+eleHeightNum)) {
					element.css('position','fixed');
					element.css('bottom',scope.option.offBottom);
				} else {
					element.removeAttr('style');
				} 
				$(window).scroll(function(){  
					var t = document.documentElement.scrollTop || document.body.scrollTop; //滚动条竖直方向滚动的距离

					//top判断
					if( t >= (jTop-offTopNum) ) { 
					 	element.css('position','fixed');
					 	element.css('margin-top','0');
				     	element.css('top',scope.option.offTop);
				     	eleParent.css('display','block');
				     } else if (t <= (jTop-browserHeight+offBottomNum+eleHeightNum)) { //bottom判断
				     	element.css('position','fixed');
						element.css('bottom',scope.option.offBottom);
				     } else {
				     	element.removeAttr('style');
				     	eleParent.css('display','none');
				     } 
				});
			});
		}
	}
}]);






