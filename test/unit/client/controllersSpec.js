'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('daniboomerangControllers'));

    it('should ....', inject(function($controller) {
    //spec body
    var navCtrl = $controller('NavController', { $scope: {} });
    expect(navCtrl).toBeDefined();
  }));
  
});
