'use strict';

angular.module('iamNobodyApp')
    .controller('eventFlowCtrl', function ($scope, $rootScope) {
        $scope.events = [
            {'description': '我是一個無名的人'}
        ];

        console.log($rootScope.me);

        $scope.eventInjection = function (eventEntry) {
            $scope.$apply(function() {
              $scope.events.push(eventEntry);
            });
        };

        $scope.addOne = function () {
            $rootScope.me.hp ++;
        };
    });