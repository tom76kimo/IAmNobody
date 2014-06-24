'use strict';

angular.module('iamNobodyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/battle', {
        templateUrl: 'partials/battle',
        controller: 'BattleCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth, Hero, Item, Nobodyresource) {
    $rootScope.me = new Hero();
    $rootScope.item = new Item();
    $rootScope.resource = new Nobodyresource();
    
    if (localStorage.getItem('iamnobody') !== null) {
      console.log('Load Data....');
      var data = JSON.parse(localStorage.getItem('iamnobody'));
      $rootScope.me.loadData(data.heroData);
      $rootScope.resource.loadData(data.resourceData);
    }
    setInterval(function () {
      localStorage.setItem('iamnobody', JSON.stringify({heroData: $rootScope.me.data, resourceData: $rootScope.resource.data}));
      console.log('Saved...');
    }, 5000);
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });