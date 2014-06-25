'use strict';

angular.module('iamNobodyApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.resource = $rootScope.resource;
    $scope.me = $rootScope.me;
    $scope.smeltingItems = $rootScope.item.getSmeltingItem();
    $scope.products = $rootScope.item.getProduct();

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
            $scope.resource.buyWorker();
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

    $scope.setCurrentItem = function (item, isProduct) {
        isProduct = isProduct || false;
        $scope.currentItem = item;
        var output = '<div class="row">';
        if (isProduct) {
            output += '<div class="col-xs-12">金錢: ' + item.money + '</div>';
        }
        for (var i=0; i<$scope.currentItem.costPlus.length; ++i) {
            output += '<div class="col-xs-12">' + $scope.currentItem.costPlus[i].addType + ' + ' + $scope.currentItem.costPlus[i].value + '</div>';
        }
        output += '</div>';
        $scope.currentItemTooltip = output;
    };

    $scope.buyItem = function (item) {
        if ($scope.me.get('money') >= item.money) {
            $scope.me.addItem(item);
            $scope.me.set('money', $scope.me.get('money') - item.money);
        }
    };

    $scope.smeltItem = function (item) {
    };

    $scope.moveItemToStorage = function (item) {
        $scope.me.moveToStorage(item);
    };
  });
