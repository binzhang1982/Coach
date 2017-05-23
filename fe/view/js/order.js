/**
 * Created by bizhang on 2017/5/23.
 */
app.controller('OrderController', ['$rootScope', '$scope', '$location', 'netRequest', function($rootScope, $scope, $location, netRequest) {

  $scope.switchOrder = function(order) {
    if (order.canOrder){
      netRequest.updateOrder(order).then(function (res) {
        if (res != null) {
          $scope.orders = res;
        }
      }, function (res) {
        alert(res);
        $scope.getOrders();
      });
    }
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
