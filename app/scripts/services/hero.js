'use strict';

angular.module('iamNobodyApp')
  .factory('Hero', function ($rootScope) {
        var Hero = function () {
            this.data = {};
            this.data.lv = 1;
            this.data.exp = 0;
            this.data.money = 10;
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
            this.data.items = [{"no":3, "name": "小咕咕劍", "type": "weapon", "costPlus": [{"addType": "ad", "value": 15}, {"addType": "ap", "value": 5}], "canBuy": false, "require": {"wood": 5, "rock": 5}}];
            this.data.itemMaxCapcity = 10;
            this.data.storage = [];
            this.data.openingWords = 0;

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
                    self.addValue('money', 1);
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
                default:
                    this.data[valueType] += value;
                break;
            }
        };

        Hero.prototype.roundedValue = function (value) {
            var targetValue = Math.floor(value * 100);
            return (targetValue / 100);
        };

        Hero.prototype.addItem = function (item) {
            if (this.get('items').length >= this.get('itemMaxCapcity')) {
                return false;
            }
            this.data.items.push(item);
            return true;
        };

        Hero.prototype.getCostPlus = function () {
            var result = {};
            for (var i=0; i<this.userItems.length; ++i) {
                var addType = this.userItems[i].addType;
                if (result[addType]) {
                    result[addType] += this.userItems[i].value;
                } else {
                    result[addType] = this.userItems[i].value;
                }
            }
            return result;
        };

        Hero.prototype.get = function (attrName) {
            return this.data[attrName]
        };

        Hero.prototype.set = function (attrName, value) {
            this.data[attrName] = value;
        };

        Hero.prototype.moveToStorage = function (item) {
            this.data.storage.push(item);
            var index = this.searchItem(this.data.items, item);
            if (index !== -1) {
                this.data.items.splice(index, 1);
                return true;
            }
            return false;
        };

        Hero.prototype.removeFromStorage = function (index) {
            this.data.storage.splice(index, 1);
        };

        Hero.prototype.searchItem = function (targetArray, item) {
            for (var i=0; i<targetArray.length; ++i) {
                if (targetArray[i].name === item.name) {
                    return i;
                }
            }
            return -1;
        };

        return Hero;
    });