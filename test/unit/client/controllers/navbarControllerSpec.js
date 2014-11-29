'use strict';

describe('Navbar Controller', function() {

    var $scope;
    var $rootScope;
    var NavbarCtrl;

    beforeEach(function () {        
        module('daniboomerangControllers');
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($injector, $controller) {

        $rootScope = $injector.get('$rootScope');
        
        // And the Scope and the Controller
        $scope = $rootScope.$new();
        NavbarCtrl = $controller('NavbarCtrl', {
            $scope: $scope,
            $rootScope: $rootScope
        });
    }));

    it('should do nothing yet....', function() {
        expect(true).toBe(true);
    });

});   