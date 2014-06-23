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

    return Item;
  });
