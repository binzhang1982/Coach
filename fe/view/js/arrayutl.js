;(function(angular, _){
	angular.module('appModule')
    .factory('arrayutl',[function(){
        var remove = function(list){
            return {
                when:function(predicate){
                    var items = _.filter(list, predicate);

                    if(items)
                    {
                        items.forEach(function(n){
                            var index = _.indexOf(list, n);
                            if(index >=0)
                            {
                                list.splice(index, 1);
                            }
                        });
                    }
                    return list;
                }
            };
        }

        var addRange = function(list, newList){
            if(list && newList)
            {
                newList.forEach(function(n){
                    list.push(n);
                });
            }

            return list;
        }

        var clear = function(list){
            if(list)
            {
                list.splice(0, list.length);
            }
        }

        var exists = function(list, predicate){
            if(list && predicate)
            {
                return _.find(list, predicate) != null;
            }
            else
                return false;

        }

        var convert = function(list, handle){
            var result = [];
            if(list == null)
                return result;
            for(var i = 0; i < list.length; i++)
            {
                result.push(handle(list[i]));
            }
            return result;
        }

        var sum = function(list, fieldName)
        {
            if(list)
            {
                var result = 0;
                list.forEach(n=>{
                    if(n[fieldName])
                        result += Number(n[fieldName]);
                });

                return result;
            }

            return 0;
        }

        return {
            remove:remove
            ,addRange:addRange
            ,clear:clear
            ,exists:exists
            ,convert:convert
            ,sum:sum
        }

        //end of function
    }]);
	//end of service
})(angular, _);