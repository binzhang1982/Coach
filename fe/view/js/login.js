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
          $location.path("/coachschedule");
        } else if (res.isStudent) {
          $location.path("/studorder");
        }
        $rootScope.$emit("changeLoginInfo", res);
        $scope.$emit("onLoadUsers", res);
      }
    }, function (res) {
      alert(res);
    });
  };
}]);
