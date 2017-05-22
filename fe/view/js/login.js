/**
 * Created by bizhang on 2017/5/22.
 */
app.controller('LoginController', ['$rootScope', '$scope', '$location', 'netRequest', function($rootScope, $scope, $location, netRequest) {
  $scope.loginInfo = {};

  $scope.login = function() {
    netRequest.login($scope.loginInfo).then(function (res) {
      if (res != null) {
        $scope.loginInfo.password = '';
        if (res.isCoach) {
          $location.path("/coachinfo");
        } else if (res.isStudent) {
          $location.path("/studinfo");
        }
        $scope.$emit("changeLoginInfo", res);
      }
    }, function (res) {
      alert(res);
    });
  };
}]);
