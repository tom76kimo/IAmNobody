'use strict';

angular.module('iamNobodyApp')
  .service('Nobodyresource', function ($rootScope) {
    var Nobodyresource = function () {
        this.wood = 0;
        this.rock = 0;
        this.iron = 0;
        this.worker = 0;
        this.workerResource = {
            wood: 0,
            rock: 0,
            iron: 0
        };
        this.costPlus = {
            wood: 1,
            rock: 0.5,
            iron: 0.5
        };
        this.heartBeatInterval = 10 * 1000;
        this.building = [
            {'name': 'shop', require: {'wood': 100, 'rock': 5}, canBuild: true},
            {'name': 'weaponShop', require: {'wood': 200, 'rock': 10}, canBuild: false}
        ];


        //run
        this.heartBeat();
    };

    Nobodyresource.prototype.heartBeat = function () {
        var self = this;
        var doOnHeartBeat = function () {
            $rootScope.$apply(function () {
                self.addSource('wood');
                self.addSource('rock');
                self.addSource('iron');
            });
        };
        setInterval(doOnHeartBeat, this.heartBeatInterval);
    };

    Nobodyresource.prototype.addSource = function (sourceName) {
        this[sourceName] += (this.workerResource[sourceName] * this.costPlus[sourceName]);
    };

    return Nobodyresource;
    
  });
