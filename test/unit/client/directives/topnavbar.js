describe('navbar', function() {
  
	var elm, scope;

	beforeEach(function (){

		module('daniboomerangDirectives');
		module('htmlTemplates');

		inject(function($injector, $compile) {

	 		$rootScope = $injector.get('$rootScope');	   
			elm = angular.element(
			'<topnavbar></topnavbar>' 
			);
			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();

			// Spying on the broadcasting to test if we listen the events correctly
	        spyOn($rootScope, '$broadcast').andCallThrough();
		});
	});
  

  	// check if the topnavbar is correctly expanded.
    it('init should be listening "event:expand-navbar" and expand', function (){ 
    	// <div id="head" class="fixed"> <header class="show-it"> 
    	var head = elm.find('div.hide-it');
    	expect(head.length).toBe(1);
		$rootScope.$broadcast('event:expand-navbar');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:expand-navbar');
		head = elm.find('div.fixed.show-it');
      	expect(head.length).toBe(1);
      	var header = elm.find('header.expand');
      	expect(head.length).toBe(1);
    });	

  	// check if the topnavbar is correctly hidden.
    it('init should be listening "event:hide-navbar" and expand', function (){
    	// <div id="head"> <header class="hide-it"> 
		$rootScope.$broadcast('event:hide-navbar');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:hide-navbar');
		head = elm.find('div.fixed.show-it');
      	expect(head.length).toBe(0);
      	var header = elm.find('header.expand');
      	expect(head.length).toBe(0);
    });	
});