'use strict';

angular.module('iamNobodyApp')
  .controller('MainCtrl', function ($scope, $http, $rootScope, $window) {
    $scope.resource = $rootScope.resource;
    $scope.me = $rootScope.me;
    $scope.smeltingItems = $rootScope.item.getSmeltingItem();
    $scope.products = $rootScope.item.getProduct();
    $scope.windowHeight = $window.innerHeight - 300;

    $scope.openingWordsGoing = function () {
        if ($scope.me.data.openingWords === 0) {
            $rootScope.events.push({'description': '我是一個無名的人...'});
        } else if($scope.me.data.openingWords === 1){
            $rootScope.events.push({'description': '但也只是現在'});
        } else {
            $rootScope.events.push({'description': '我已經準備好開始我的旅程'});
        }
        $scope.me.data.openingWords++;
    };

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
            $rootScope.events.push({'description': '雇用一位工人'});
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

    $scope.setCurrentItem = function (item, options) {
        options = options || {};
        $scope.currentItem = item;
        this.produceTooltipHTML(options);
    };

    $scope.produceTooltipHTML = function (options) {
        var output = '<div class="row">';
        if (options.isProduct) {
            output += '<div class="col-xs-12">金錢: ' + $scope.currentItem.money + '</div>';
        }
        if (options.isSmeltingItem) {
            for (var attr in $scope.currentItem.require) {
                output += '<div class="col-xs-12"><div class="detailName">' + attr + '</div><div class="detailValue">' + $scope.currentItem.require[attr] + '</div></div>';
            }
        } else {
            for (var i=0; i<$scope.currentItem.costPlus.length; ++i) {
                output += '<div class="col-xs-12">' + $scope.currentItem.costPlus[i].addType + ' + ' + $scope.currentItem.costPlus[i].value + '</div>';
            }
        }
        
        output += '</div>';
        $scope.currentItemTooltip = output;
    };

    $scope.buyItem = function (item) {
        if ($scope.me.get('money') >= item.money) {
            if ($scope.me.addItem(item)) {
                $scope.me.set('money', $scope.me.get('money') - item.money);
                $rootScope.events.push({'description': '買了{ '+ item.name + ' }'});
            } else {
                $rootScope.events.push({'description': '空間不夠...'});
            }
        } else {
            $rootScope.events.push({'description': '錢好像不夠...'});
        }
    };

    $scope.smeltItem = function (item) {
        if (item.canBuy !== false) {
            return;
        }

        //check resource amount
        for (var attr in item.require) {
            if ($scope.resource.data[attr] < item.require[attr]) {
                return false;
            }
        }

        //minors resource amount
        for (var attr in item.require) {
            $scope.resource.data[attr] -= item.require[attr];
        }
        $scope.me.addItem(item);
        return true;
    };

    $scope.moveItemToStorage = function (item) {
        if ($scope.me.moveToStorage(item) === true) {
            $rootScope.events.push({'description': '已丟棄{ ' + item.name + ' }'});
        }
    };
  });
