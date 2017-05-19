/* eslint no-alert: 0 */

'use strict';

//
// Here is how to define your module
// has dependent on mobile-angular-ui
//
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
  // This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

//
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false'
// in order to avoid unwanted routing.
//
app.config(function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: '../home.html', reloadOnSearch: false});
  $routeProvider.when('/scroll', {templateUrl: '../scroll.html', reloadOnSearch: false});
  $routeProvider.when('/toggle', {templateUrl: '../toggle.html', reloadOnSearch: false});
  $routeProvider.when('/tabs', {templateUrl: '../tabs.html', reloadOnSearch: false});
  $routeProvider.when('/accordion', {templateUrl: '../accordion.html', reloadOnSearch: false});
  $routeProvider.when('/overlay', {templateUrl: '../overlay.html', reloadOnSearch: false});
  $routeProvider.when('/forms', {templateUrl: '../biz/login.html', reloadOnSearch: false});
  $routeProvider.when('/dropdown', {templateUrl: '../dropdown.html', reloadOnSearch: false});
  $routeProvider.when('/touch', {templateUrl: '../touch.html', reloadOnSearch: false});
  $routeProvider.when('/swipe', {templateUrl: '../swipe.html', reloadOnSearch: false});
  $routeProvider.when('/drag', {templateUrl: '../drag.html', reloadOnSearch: false});
  $routeProvider.when('/drag2', {templateUrl: '../drag2.html', reloadOnSearch: false});
  $routeProvider.when('/carousel', {templateUrl: '../carousel.html', reloadOnSearch: false});

  $routeProvider.when('/', {templateUrl: '../view/biz/login.html', reloadOnSearch: true});
  $routeProvider.when('/adduser', {templateUrl: '../view/biz/adduser.html', reloadOnSearch: true});

  $routeProvider.when('/studinfo', {templateUrl: '../view/biz/student/info.html', reloadOnSearch: true});
  $routeProvider.when('/studorder', {templateUrl: '../view/biz/student/order.html', reloadOnSearch: true});
  $routeProvider.when('/studlist', {templateUrl: '../view/biz/student/list.html', reloadOnSearch: true});

  $routeProvider.when('/coachlist', {templateUrl: '../view/biz/coach/list.html', reloadOnSearch: true});
  $routeProvider.when('/coachinfo', {templateUrl: '../view/biz/coach/info.html', reloadOnSearch: true});
  $routeProvider.when('/coachschedule', {templateUrl: '../view/biz/coach/schedule.html', reloadOnSearch: true});

  $routeProvider.when('/adminconfig', {templateUrl: '../view/biz/admin/config.html', reloadOnSearch: true});
});

//
// `$touch example`
//

app.directive('toucharea', ['$touch', function($touch) {
  // Runs during compile
  return {
    restrict: 'C',
    link: function($scope, elem) {
      $scope.touch = null;
      $touch.bind(elem, {
        start: function(touch) {
          $scope.containerRect = elem[0].getBoundingClientRect();
          $scope.touch = touch;
          $scope.$apply();
        },

        cancel: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        move: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        end: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        }
      });
    }
  };
}]);

//
// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout) {
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem) {
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if (drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function() {
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
});

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function() {
  return {
    restrict: 'C',
    scope: {},
    controller: function() {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function() {
        var newId = this.itemCount++;
        this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function() {
        var res = 0;
        if (id === carousel.activeItem) {
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function() {
        return carousel.activeItem;
      }, function() {
        elem[0].style.zIndex = zIndex();
      });

      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          //
          // use translate both as basis for the new transform:
          //
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);

          //
          // Add rotation:
          //
          var Dx = touch.distanceX;
          var t0 = touch.startTransform;
          var sign = Dx < 0 ? -1 : 1;
          var angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

          t.rotateZ = angle + (Math.round(t0.rotateZ));

          return t;
        },
        move: function(drag) {
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function() {
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          drag.reset();
        }
      });
    }
  };
});

app.directive('dragMe', ['$drag', function($drag) {
  return {
    controller: function($scope, $element) {
      $drag.bind($element,
        {
          //
          // Here you can see how to limit movement
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}]);

app.directive("rating", function() {
  var directive = { };
  directive.restrict = 'AE';

  directive.scope = {
    score: '=score',
    max: '=max',
    readonly: "=readonly"
  };

  directive.templateUrl = "./components/rating.html";

  directive.link = function(scope, elements, attr) {

    scope.updateStars = function() {
      var idx = 0;
      scope.stars = [ ];
      for (idx = 0; idx < scope.max; idx += 1) {
        scope.stars.push({
          full: scope.score > idx
        });
      }
    };

    scope.hover = function(/** Integer */ idx) {
      if (scope.readonly) {
        return;
      }
      scope.hoverIdx = idx;
    };

    scope.stopHover = function() {
      if (scope.readonly) {
        return;
      }
      scope.hoverIdx = -1;
    };

    scope.starColor = function(/** Integer */ idx) {
      var starClass = 'rating-normal';
      if (idx <= scope.hoverIdx) {
        starClass = 'rating-highlight';
      }
      return starClass;
    };

    scope.starClass = function(/** Star */ star, /** Integer */ idx) {
      var starClass = 'fa-star-o';
      if (star.full || idx <= scope.hoverIdx) {
        starClass = 'fa-star';
      }
      return starClass;
    };

    scope.setRating = function(idx) {
      if (scope.readonly) {
        return;
      }
      scope.score = idx + 1;
      scope.stopHover();
    };

    scope.$watch('score', function(newValue, oldValue) {
      if (newValue !== null && newValue !== undefined) {
        scope.updateStars();
      }
    });
  };

  return directive;
});

app.factory('netRequest', ['$q', '$http', 'Url', "$rootScope", function ($q, $http, Url, $rootScope) {
  function handleResponse(promise) {
    return promise.then(function (res) {
      if (res.data.status == "ok")
        return $q.resolve(res.data.data);
      else if (res.data.status == "error" && res.data.data == "10000")
        $.alert("没有当前操作权限!");
      else
        return $q.reject(res.data.message);
    }, function (res) {
      return $q.reject("服务器请求异常");
    });
  }

  //设置10s请求超时
  var timeout = 10000000;
  var service = {};

  service.saveStudent = function (student) {
    var url = Url.saveStudent + "?token=" + $rootScope.token;
    var promise = $http.post(url, student, {timeout: timeout});
    return handleResponse(promise);
  }

  return service;

}])
  .factory('Url', [function () {
    var host ="http://localhost:8080";
    var path="/coach-talk/api";
    return {
      //获取服务清单列表
      //getServiceList: host + path + "/custserv/servlist/{managingId}",
      //保存学生
      saveStudent: host + path + "/student/save_student"
    };
  }]);


//
// For this trivial demo we have just a unique MainController
// for everything
//
app.controller('MainController', ['$rootScope', '$scope', 'netRequest', function($rootScope, $scope, netRequest) {

  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum ' +
    'corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  //
  // 'Scroll' screen
  //
  var scrollItems = [];

  for (var i = 1; i <= 100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    alert('Congrats you scrolled to the end of the list!');
  };

  //
  // 'Drag' screen
  //
  $scope.notices = [];

  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1)});
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
  };


  // new
  $scope.isCoach = false;
  $scope.isStudent = false;
  $scope.isAdmin = false;
  $scope.loggedIn = false;
  //$scope.loggedIn = false;

  $scope.sexes = [
    {id: '1', name: '男'},
    {id: '2', name: '女'}
  ];

  $scope.coachs = [
    {id: '1', name: '杨教练', icon: "", levels: "C1", rating: "5"},
    {id: '2', name: '张教练', icon: "", levels: "C2", rating: "4"}
  ];

  $scope.students = [
    {id: '1', name: '张一', icon: "", levels: "C1"},
    {id: '2', name: '张二', icon: "", levels: "C2"}
  ];

  $scope.examlevels = [
    {id: '1', name: 'A1 大型载客汽车'},
    {id: '2', name: 'A2 重型,中型全挂,半挂汽车列车'},
    {id: '3', name: 'A3 核载10人以上的城市公共汽车'},
    {id: '4', name: 'B1 中型载客汽车'},
    {id: '5', name: 'B2 重型,中型载货汽车等'},
    {id: '6', name: 'C1 小型,微型载客汽车等'},
    {id: '7', name: 'C2 小型,微型自动挡载客汽车等'},
    {id: '8', name: 'C3 低速载货汽车(原四轮农用运输车)'},
    {id: '9', name: 'C4 三轮汽车(原三轮农用运输车)'},
    {id: '10', name: 'D 发动机排量大于50ml或者最大设计车速大于50km/h的三轮摩托车'},
    {id: '11', name: 'E 发动机排量大于50ml或者最大设计车速大于50km/h的二轮摩托车'},
    {id: '12', name: 'F 发动机排量小于等于50ml或者最大设计车速小于等于50km/h的摩托车'},
    {id: '13', name: 'M 轮式自行机械车'},
    {id: '14', name: 'N 无轨电车'},
    {id: '15', name: 'P 有轨电车'}
  ];
  //
  // 'Forms' screen
  //
  $scope.email = 'me@example.com';
  $scope.student = {};

  $scope.addstudent = function() {
    $scope.student.levelId = $scope.student.selectedLevel.id;
    $scope.student.sexId = $scope.student.selectedSex.id;

    netRequest.saveStudent($scope.student).then(function (res) {
      if (res != null) {
        $scope.student.password = '';
        $scope.student.repassword = '';
      }
    }, function (res) {
      alert(res);
    });
  };

  $scope.login = function() {
    alert('You submitted the login form');
  };


}]);
