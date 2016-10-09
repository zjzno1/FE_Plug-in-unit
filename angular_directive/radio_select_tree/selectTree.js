app = angular.module('myApp',[]);

app.factory('RecursionHelper', ['$compile', function($compile){  
	return {  
        /** 
         * Manually compiles the element, fixing the recursion loop. 
         * @param element 
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties. 
         * @returns An object containing the linking functions. 
         */  
         compile: function(element, link){  
            // Normalize the link parameter  
            // 如果link参数是对象类型link:{pre: function(...){}, post: function(...){}}则不做处理  
            // 如果link参数是函数类型则将其作为post-link函数在$compile之后调用  
            if(angular.isFunction(link)){  
            	link = { post: link };  
            }  

            // Break the recursion loop by removing the contents  
            // 获取并清空当前元素的内容，后面进行编译  
            var contents = element.contents().remove();  
            var compiledContents;  

            return {  
            	pre: (link && link.pre) ? link.pre : null,  
                /** 
                 * Compiles and re-adds the contents 
                 * 编译和重新添加内容到当前元素 
                 */  
                 post: function(scope, element){  
                    // Compile the contents  
                    if(!compiledContents){  
                    	compiledContents = $compile(contents);  
                    }  
                    // Re-add the compiled contents to the element  
                    compiledContents(scope, function(clone){  
                    	element.append(clone);  
                    });  

                    // Call the post-linking function, if any  
                    if(link && link.post){  
                    	link.post.apply(null, arguments);  
                    }  
                }  
            };  
        }  
    };  
}]);  

app.controller("TreeController", function($scope) {  
	$scope.folder = {
		state: false,
		type: false,
		name: 'aaa',  
		children: [  
		{  
			state: false,
			type: false,
			name: 'server-side',  
			children: [  
			{  
				state: false,
				type: false,
				name: 'Java',
				children:[
					{
						state: false,
						type: false,
						name:'zjz'						
					},
					{
						state: false,
						type: false,
						name:'asd'
					}
				] 
			},  
			{  
				state: false,
				type: false,
				name: 'Python'  
			},  
			{  
				state: false,
				type: false,
				name: 'Node'  
			}  
			]  
		},  
		{  
			state: false,
			type: false,
			name: 'front-end',  
			children: [  
			{  
				state: false,
				type: false,
				name: 'jQuery'  
			},  
			{  
				state: false,
				type: false,
				name: 'Angular'  
			},  
			{  
				state: false,
				type: false,
				name: 'React'  
			}  
			]  
		}  
		]  
	}
	$scope.sw = {
		swit: true
	}
});

app.directive("selectTree", function(RecursionHelper) {  
	return {  
		restrict: "AE",  
		replace:true,
		scope: {  
			option: '=',
			swit:'=',
			checkData:'='
		},  
		templateUrl: 'selectTree.html',  
		compile: function(element) {  
        // 我们这里使用RecursionHelper的compile方法编译指令当前元素，这里第二个参数指定一个函数，相当于常用的link函数  
        // 当然我们也可以指定一个对象，里面包含pre和post函数，分别对应pre-link和post-link  
	        return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){  

	            //   这个函数会循环遍历全部option
	            //     
	            var show,checkData;
	            // alert(!scope.swit.swit);
	            if(!scope.swit.swit){
	            	event.stopPropagation();
	            }
	            scope.showData = function (element) {
		        	show = element.name;
		        	$('#select-tree-show-area').html(show);
		        	checkData = element;
		        	// console.log(checkData);
		        }
		        // scope.stopPro = function (event) {
		        // 	event.stopPropagation();
		        // }
		        //判断当前节点是否是叶子节点————然而并没有什么用，，只是阻止冒泡事件
		        scope.isLeaf = function (option,event,flag) {
		        	if(option.hasOwnProperty('children')) { 
		            	//如果当前节点不是叶子节点
		            	 // console.log(option.hasOwnProperty('children'));
		            	 if(flag==false) {
		            	 	// $(this).children().hide();
		            	 	// element.find().hide();
		            	 	flag = true;
		            	 	console.log(flag);
		            	 }else {
		            	 	flag = false;
		            	 	console.log(flag);
		            	 	// option.children().show();
		            	 }
		            	event.stopPropagation();
		            }else {
		            	//如果当前节点是叶子节点
		            	//do nothing	
		            }
		        }
	            if(scope.option.hasOwnProperty('children')) { 
	            	//如果当前节点不是叶子节点
	            	// alert(scope.option.name);
	            }else {
	            	//如果当前节点是叶子节点
	            	scope.option.type = true;  	
	            }
	            // console.log(scope.option.name);
	            // 这里可以往scope中绑定一些变量  
	            // scope.variable = 'hello world';
	        });  
    	}  
	};  
}); 

app.directive("radioSelectTree",function () {
	return {
		restrict: 'AE',
		replice: true,
		scope: {
			option: '=',
			swit:'=',
			// show:'@'  
		},
		templateUrl: 'radioSelectTree.html',
		link: function (scope, element, attrs) {
			 /* body... */ 
		}
	}
});







