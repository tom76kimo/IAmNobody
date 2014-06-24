'use strict';

angular.module('iamNobodyApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.resource = $rootScope.resource;
    $scope.me = $rootScope.me;
    console.log($scope.me.data.items);

    $scope.enterBulding = function (building) {
        $scope.enterBuilding = building;
    };

    $scope.leaveBulding = function () {
        $scope.enterBuilding = null;
    };

    $scope.isEnteringBuilding = function (building) {
        if ($scope.enterBuilding === building)
            return true;
        return false;
    };

    $scope.build = function () {
        if (!$scope.enterBuilding.canBuilt) {
            return;
        }

        return $rootScope.resource.buildBuilding($scope.enterBuilding.id);
    };

    $scope.buyWorker = function () {
        if ($scope.me.data.money >= $scope.resource.data.workerValue) {
            $scope.me.data.money -= $scope.resource.data.workerValue;
            $scope.resource.data.worker += 1;
        }
    };

    $scope.addWorker = function (resourceName) {
        if ($scope.resource.data.worker > 0) {
            $scope.resource.data.worker --;
            $scope.resource.data.workerResource[resourceName]++;
        }
    };

    $scope.minusWorker = function (resourceName) {
        if ($scope.resource.data.workerResource[resourceName] > 0) {
            $scope.resource.data.workerResource[resourceName] --;
            $scope.resource.data.worker ++;
        }
    };
  });
