'use strict';

angular.module('iamNobodyApp')
  .controller('BattleCtrl', function ($scope, $rootScope) {
    $scope.me = $rootScope.me;
  });
