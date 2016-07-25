
app = angular.module('myApp',[]);
app.directive('selectDrop',function ($timeout) {
   return {
        restrict: 'AE',
        templateUrl: 'view.html',
        replace: true,
        scope: {
         selectData:'='
        },
        link: function (scope, element, attrs) {
            scope.selects = 
            [
                {
                    id:0,
                    name:'足球',
                    state: false
                },
                {
                    id:1,
                    name:'篮球',
                    state: false
                },
                {
                    id:2,
                    name:'乒乓球',
                    state: false
                }
            ];
            scope.selectData = [];
            scope.selectlabel = function (event) {
                event.stopPropagation();
            };
            scope.selectCheck = function (select,event) {
                event.stopPropagation();
                select.state = !select.state;
                console.log(select.id);
                scope.selectData[select.id] = select.state;
                console.log(scope.selectData[select.id]);
            };
        }
    };
});