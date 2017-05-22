/**
 * Created by bizhang on 2017/5/22.
 */
app.controller('LoginController', ['$rootScope', '$scope', '$location', 'netRequest', function($rootScope, $scope, $location, netRequest) {
  $scope.loginInfo = {};

  $scope.login = function() {
    netRequest.saveStudent($scope.loginInfo).then(function (res) {
      if (res != null) {
        $scope.loginInfo.password = '';

        $location.path("/studinfo");
        $scope.$emit("changeLoginInfo", {
          "isCoach" : false,
          "isStudent" : true,
          "isAdmin" : false,
          "loggedIn" : true,
          "token" : res
        });
      }
    }, function (res) {
      alert(res);
    });
  };
}]);
