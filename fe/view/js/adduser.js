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
        $scope.$parent.$parent.token = res;
        $location.path("/studinfo");
        $scope.$parent.$parent.loggedIn = true;
        $scope.$parent.$parent.isCoach = false;
        $scope.$parent.$parent.isStudent = true;
        $scope.$parent.$parent.isAdmin = false;
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
        $scope.$parent.$parent.token = res;
        $location.path("/coachinfo");
        $scope.$parent.$parent.loggedIn = true;
        $scope.$parent.$parent.isCoach = true;
        $scope.$parent.$parent.isStudent = false;
        $scope.$parent.$parent.isAdmin = false;
      }
    }, function (res) {
      alert(res);
    });
  };
}]);
