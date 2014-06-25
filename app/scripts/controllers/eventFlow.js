'use strict';

angular.module('iamNobodyApp')
    .controller('eventFlowCtrl', function ($scope, $rootScope) {
        $scope.events = $rootScope.events = [
            {'description': '我是一個無名的人'}
        ];

        $scope.eventInjection = function (eventEntry) {
            $scope.$apply(function() {
              $scope.events.push(eventEntry);
            });
        };

        $scope.addOne = function () {
            $rootScope.me.data.hp ++;
        };
    })
    .filter('reverse', function () {
        return function (items) {
            return items.slice().reverse();
        }
    });