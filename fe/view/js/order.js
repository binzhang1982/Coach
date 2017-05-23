/**
 * Created by bizhang on 2017/5/23.
 */
app.controller('OrderController', ['$rootScope', '$scope', '$location', 'netRequest', function($rootScope, $scope, $location, netRequest) {

  $scope.switchOrder = function(order) {
    alert(order.hasOrdered);
    //netRequest.updateSchedule(schedule).then(function (res) {
    //  if (res != null) {
    //    $scope.schedules = res;
    //  }
    //}, function (res) {
    //  alert(res);
    //});
  }

  $scope.getOrders =function() {
    netRequest.getOrder().then(function (res) {
      if (res != null) {
        $scope.orders = res;
      }
    }, function (res) {
      alert(res);
    });
  };

  $scope.getOrders();
}]);
