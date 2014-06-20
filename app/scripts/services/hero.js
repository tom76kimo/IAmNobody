'use strict';

angular.module('iamNobodyApp')
  .factory('Hero', function ($rootScope) {
        var Hero = function () {
            this.data = {};
            this.data.hp = 50;
            this.data.maxHp = 100;
            this.data.mp = 20;
            this.data.maxMp = 40;
            this.data.ad = 10;
            this.data.ap = 0;
            this.data.hpAddRate = 1;
            this.data.mpAddRate = 0.5;
            this.data.addInterval = 5000;

            //run
            this.heartBeat();
        };

        Hero.prototype.heartBeat = function () {
            var self = this;
            
            setInterval(function () {
                $rootScope.$apply(function () {
                    //hp part
                    if (self.data.hp + self.data.hpAddRate <= self.data.maxHp) {
                        self.data.hp += self.data.hpAddRate ;
                    }

                    //mp part
                    if (self.data.mp + self.data.mpAddRate <= self.data.maxMp) {
                        self.data.mp += self.data.mpAddRate ;
                    }
                });
            }, this.data.addInterval);
        };

        Hero.prototype.loadData = function (data) {
            var self = this;
            self.data = data;
        };

        return Hero;
    });