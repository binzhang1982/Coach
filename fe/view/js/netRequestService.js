/**
 * Created by bizhang on 2017/5/22.
 */
app.factory('netRequest', ['$q', '$http', 'Url', "$rootScope", function ($q, $http, Url, $rootScope) {
  function handleResponse(promise) {
    $rootScope.loading = true;
    return promise.then(function (res) {
      if (res.data.status == "ok") {
        $rootScope.loading = false;
        return $q.resolve(res.data.data);
      }
      else {
        $rootScope.loading = false;
        return $q.reject(res.data.message);
      }
    }, function (res) {
      $rootScope.loading = false;
      return $q.reject("服务器请求异常");
    });
  }

  //设置10s请求超时
  var timeout = 10000000;
  var service = {};

  //取选项配置值
  service.getParams = function (groupkey) {
    var url = Url.getParams + "?groupkey=" + groupkey;

    var promise = $http.get(url, {timeout: timeout});
    return handleResponse(promise);
  };

  //登陆
  service.login = function (data) {
    var url = Url.login;

    var promise = $http.post(url, data, {timeout: timeout});
    return handleResponse(promise);
  };

  //登出
  service.logout = function () {
    var url = Url.getParams + "?groupkey=" + groupkey;

    var promise = $http.get(url, {timeout: timeout});
    return handleResponse(promise);
  };

  //取得学员列表
  service.getStudentList = function () {
    var url = Url.getStudentList;
    var promise = $http.get(url, {timeout: timeout});
    return handleResponse(promise);
  };

  //取得自己学员列表
  service.getOwnStudentList = function () {
    var url = Url.getOwnStudentList + "?token=" + $rootScope.loginStatus.token;
    var promise = $http.get(url, {timeout: timeout});
    return handleResponse(promise);
  };

  //保存学员
  service.saveStudent = function (data) {
    var url;
    if ($rootScope.loginStatus.token) {
      url = Url.saveStudent + "?token=" + $rootScope.loginStatus.token;
    } else {
      url = Url.saveStudent;
    }
    var promise = $http.post(url, data, {timeout: timeout});
    return handleResponse(promise);
  };

  //取得教练列表
  service.getCoachList = function () {
    var url = Url.getCoachList;
    var promise = $http.get(url, {timeout: timeout});
    return handleResponse(promise);
  };

  //取得自己教练列表
  service.getOwnCoachList = function () {
    var url = Url.getOwnCoachList + "?token=" + $rootScope.loginStatus.token;
    var promise = $http.get(url, {timeout: timeout});
    return handleResponse(promise);
  };

  //保存教练
  service.saveCoach = function (data) {
    var url;
    if ($rootScope.loginStatus.token) {
      url = Url.saveCoach + "?token=" + $rootScope.loginStatus.token;
    } else {
      url = Url.saveCoach;
    }
    var promise = $http.post(url, data, {timeout: timeout});
    return handleResponse(promise);
  };

  //取得预约
  service.getOrder = function () {
    var url = Url.getOrder + "?token=" + $rootScope.loginStatus.token;
    var promise = $http.get(url, {timeout: timeout});
    return handleResponse(promise);
  };

  //更新预约
  service.updateOrder = function (data) {
    var url = Url.updateOrder + "?token=" + $rootScope.loginStatus.token;
    var promise = $http.post(url, data, {timeout: timeout});
    return handleResponse(promise);
  };

  //取得排班
  service.getSchedule = function () {
    var url = Url.getSchedule + "?token=" + $rootScope.loginStatus.token;
    var promise = $http.get(url, {timeout: timeout});
    return handleResponse(promise);
  };

  //更新排班
  service.updateSchedule = function (data) {
    var url = Url.updateSchedule + "?token=" + $rootScope.loginStatus.token;
    var promise = $http.post(url, data, {timeout: timeout});
    return handleResponse(promise);
  };

  return service;

}])
  .factory('Url', [function () {
    var host ="http://localhost:8080";
    var path="/coach-talk/api";
    return {
      //取选项配置值
      getParams: host + path + "/param/list",
      //登陆
      login: host + path + "/main/login",
      //登出
      logout: host + path + "/main/logout",
      //取得学员列表
      getStudentList: host + path + "/student/list",
      //取得自己学员列表
      getOwnStudentList: host + path + "/student/own_list",
      //保存学员
      saveStudent: host + path + "/student/save_student",
      //取得教练列表
      getCoachList: host + path + "/coach/list",
      //取得自己教练列表
      getOwnCoachList: host + path + "/coach/own_list",
      //保存教练
      saveCoach: host + path + "/coach/save_coach",
      //取得预约
      getOrder: host + path + "/order/list",
      //更新预约
      updateOrder: host + path + "/order/update",
      //取得排班
      getSchedule: host + path + "/schedule/list",
      //更新排班
      updateSchedule: host + path + "/schedule/update"
    };
  }]);
