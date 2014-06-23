'use strict';

angular.module('iamNobodyApp')
  .factory('Hero', function ($rootScope) {
        var Hero = function () {
            this.data = {};
            this.data.lv = 1;
            this.data.exp = 0;
            this.data.hp = 50;
            this.data.maxHp = 100;
            this.data.mp = 20;
            this.data.maxMp = 40;
            this.data.ad = 10;
            this.data.ap = 0;
            this.data.df = 10;
            this.data.pf = 0;
            this.data.hpAddRate = 0.3;
            this.data.mpAddRate = 0.2;
            this.data.heartBeatInterval = 5000;

            //run
            this.heartBeat();
        };

        Hero.prototype.heartBeat = function () {
            var self = this;
            
            var doOnHeartBeat = function () {
                $rootScope.$apply(function () {
                    //hp part
                    self.addValue('hp', self.data.hpAddRate);

                    //mp part
                    self.addValue('mp', self.data.mpAddRate);
                });
            };


            setInterval(doOnHeartBeat, this.data.heartBeatInterval);
        };

        Hero.prototype.loadData = function (data) {
            this.data = data;
        };

        Hero.prototype.addValue = function (valueType, value) {
            switch (valueType) {
                case 'hp':
                    if (this.data.hp + value > this.data.maxHp) {
                        this.data.hp = this.data.maxHp;
                    } else {
                        this.data.hp = this.roundedValue(this.data.hp + value);
                    }
                break;
                case 'maxHp':
                    this.data.maxHp += value;
                break;
                case 'mp':
                    if (this.data.mp + value > this.data.maxMp) {
                        this.data.mp = this.data.maxMp;
                    } else {
                        this.data.mp = this.roundedValue(this.data.mp + value);
                    }
                break;
                case 'maxMp':
                    this.data.maxMp += value;
                break;
                case 'ad':
                    this.data.ad += value;
                break;
                case 'ap':
                    this.data.ap += value;
                break;
                case 'pf':
                    this.data.pf += value;
                break;
                case 'df':
                    this.data.df += value;
                break;
            }
        };

        Hero.prototype.roundedValue = function (value) {
            var targetValue = Math.floor(value * 100);
            return (targetValue / 100);
        };

        return Hero;
    });