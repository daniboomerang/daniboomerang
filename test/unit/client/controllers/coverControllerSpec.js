'use strict';

describe('Cover Controller', function() {

    var $scope;
    var $rootScope;
    var CoverCtrl;

    beforeEach(function () {        
        module('daniboomerangControllers');
        module('duScroll');
    });

    // inject the required services and instantiate the controller
    beforeEach(inject(function($injector, $controller) {

        $rootScope = $injector.get('$rootScope');
        
        // And the Scope and the Controller
        $scope = $rootScope.$new();
        CoverCtrl = $controller('CoverCtrl', {
            $scope: $scope,
            $rootScope: $rootScope
        });
    }));

    it('should do nothing yet....', function() {
        expect(true).toBe(true);
    });

});   

