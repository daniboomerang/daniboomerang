'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('daniboomerangControllers'));

    it('should ....', inject(function($controller) {
    //spec body
    var navbarCtrl = $controller('NavbarCtrl', { $scope: {} });
    expect(navbarCtrl).toBeDefined();
    var layoutCtrl = $controller('LayoutCtrl', { $scope: {} });
    expect(layoutCtrl).toBeDefined();
    var sidebarCtrl = $controller('SidebarCtrl', { $scope: {} });
    expect(sidebarCtrl).toBeDefined();
    var sidebarResponsiveCtrl = $controller('SidebarResponsiveCtrl', { $scope: {} });
    expect(sidebarResponsiveCtrl).toBeDefined();
  }));
  
});
