/**
 * Created by bizhang on 2017/5/23.
 */
app.controller('ScheduleController', ['$rootScope', '$scope', '$location', 'netRequest', function($rootScope, $scope, $location, netRequest) {

  $scope.switchWork = function(schedule) {
    netRequest.updateSchedule(schedule).then(function (res) {
      if (res != null) {
        $scope.schedules = res;
      }
    }, function (res) {
      alert(res);
    });
  }

  $scope.getSchedules =function() {
    netRequest.getSchedule().then(function (res) {
      if (res != null) {
        $scope.schedules = res;
      }
    }, function (res) {
      alert(res);
    });
  };

  $scope.getSchedules();
}]);
