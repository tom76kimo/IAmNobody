'use strict';

angular.module('iamNobodyApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
