'use strict';

angular.module('iamNobodyApp')
  .service('Item', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var ItemEntry = function (name, type, addType, value) {
        this.name = name;
        this.type = type;
        this.addType = addType;
        this.value = value;
    };
    var Item = function () {
        this.userItems = [];
        this.allItems = [];
        /*
        this.userWeapon = null;
        this.userArmor = null;
        */
        this.loadData();
    };

    Item.prototype.loadData = function () {
        var self = this;
        $http.get('json/item.json').success(function (data) {
            self.allItems = data;
        });
    };

    Item.prototype.getSmeltingItem = function () {
        return this.getItemByCanBuy(false);
    };

    Item.prototype.getProduct = function () {
        return this.getItemByCanBuy(true);
    };

    Item.prototype.getItemByCanBuy = function (canBuy) {
        if (canBuy !== true && canBuy !== false) {
            return false;
        }
        var result = [];
        for (var i=0; i<this.allItems.length; ++i) {
            if (this.allItems[i].canBuy === canBuy) {
                result.push(this.allItems[i]);
            }
        }
        return result;
    };

    return Item;
  });
