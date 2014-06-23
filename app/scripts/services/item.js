'use strict';

angular.module('iamNobodyApp')
  .service('Item', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var ItemEntry = function (name, type, addType, value) {
        this.name = name;
        this.type = type;
        this.addType = addType;
        this.value = value;
    };
    var Item = function () {
        this.userItems = [];
        this.userWeapon = null;
        this.userArmor = null;
    };

    return Item;
  });
