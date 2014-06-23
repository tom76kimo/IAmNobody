'use strict';

describe('Service: Nobodyresource', function () {

  // load the service's module
  beforeEach(module('iamNobodyApp'));

  // instantiate service
  var Nobodyresource;
  beforeEach(inject(function (_Nobodyresource_) {
    Nobodyresource = _Nobodyresource_;
  }));

  it('should do something', function () {
    expect(!!Nobodyresource).toBe(true);
  });

});
