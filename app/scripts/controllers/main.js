'use strict';

angular.module('iamNobodyApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.resource = $rootScope.resource;

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

        //TODO Build bilding....
        $rootScope.resource.buildBuilding($scope.enterBuilding.id);
    };
  });
