/**
 * Created by bizhang on 2017/5/22.
 */
app.controller('AddUserController', ['$rootScope', '$scope', '$location', 'netRequest', function($rootScope, $scope, $location, netRequest) {
  $scope.student = {};
  $scope.coach = {};

  $scope.addstudent = function() {
    $scope.student.levelId = $scope.student.selectedLevel.id;
    $scope.student.sexId = $scope.student.selectedSex.id;

    netRequest.saveStudent($scope.student).then(function (res) {
      if (res != null) {
        $scope.student.password = '';
        $scope.student.repassword = '';
        $location.path("/studorder");
        $rootScope.$emit("changeLoginInfo", res);
      }
    }, function (res) {
      alert(res);
    });
  };

  $scope.addcoach = function() {
    $scope.coach.levelId = $scope.coach.selectedLevel.id;
    $scope.coach.sexId = $scope.coach.selectedSex.id;

    netRequest.saveCoach($scope.coach).then(function (res) {
      if (res != null) {
        $scope.coach.password = '';
        $scope.coach.repassword = '';
        $location.path("/coachschedule");
        $rootScope.$emit("changeLoginInfo", res);
      }
    }, function (res) {
      alert(res);
    });
  };
}]);
