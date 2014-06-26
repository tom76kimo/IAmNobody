'use strict';

angular.module('iamNobodyApp')
    .controller('eventFlowCtrl', function ($scope, $rootScope, $window) {
        $scope.events = $rootScope.events = [
        ];

        $scope.innerHeight = $window.innerHeight - 130;

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