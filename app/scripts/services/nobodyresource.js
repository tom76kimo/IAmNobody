'use strict';

angular.module('iamNobodyApp')
  .service('Nobodyresource', function ($rootScope) {
    var Nobodyresource = function () {
        this.data = {};
        this.data.wood = 100;
        this.data.rock = 0;
        this.data.iron = 0;
        this.data.worker = 0;
        this.data.maxWorker = 0;
        this.data.workerValue = 1;
        this.data.workerResource = {
            wood: 0,
            rock: 0,
            iron: 0
        };
        this.data.costPlus = {
            wood: 1,
            rock: 0.5,
            iron: 0.5
        };
        this.data.heartBeatInterval = 10 * 1000;
        this.data.building = [
            {'id': 0, 'name': '商店', require: {'wood': 100}, canBuilt: true, built: false},
            {'id': 1, 'name': '冶煉屋', require: {'wood': 200, 'rock': 10}, canBuilt: true, built: false}
        ];

        this.data.heroBuilding = [];
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
        setInterval(doOnHeartBeat, this.data.heartBeatInterval);
    };

    Nobodyresource.prototype.addSource = function (sourceName) {
        this.data[sourceName] += (this.data.workerResource[sourceName] * this.data.costPlus[sourceName]);
    };

    Nobodyresource.prototype.buildBuilding = function (buildingId) {
        var enoughResource = true;
        for (var attr in this.data.building[buildingId].require) {
            if (this.data[attr] < this.data.building[buildingId].require[attr]) {
                enoughResource = false;
                break;
            }
        }
        if (enoughResource === true) {
            for (var attr in this.data.building[buildingId].require) {
                this.data[attr] -= this.data.building[buildingId].require[attr];
            }
            this.data.building[buildingId].built = true;
            return true;
        } else {
            return false;
        }
        
    };

    Nobodyresource.prototype.loadData = function (data) {
        this.data = data;
    };

    Nobodyresource.prototype.buyWorker = function () {
        this.data.worker ++;
        this.data.maxWorker ++;
        this.data.workerValue = this.data.maxWorker + 1;
    };

    return Nobodyresource;
    
  });
