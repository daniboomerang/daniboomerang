describe('Introduction', function() {
  
	var elm, scope;

	beforeEach(function (){

		module('daniboomerangIntro');
		module('htmlTemplates');

		inject(function($injector, $compile) {

	 		$rootScope = $injector.get('$rootScope');	   
			elm = angular.element('<div id="intro-wrapper" daniboomerang-intro-directive></div>');
			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();

			// Spying on the broadcasting to test if we listen the events correctly
	        spyOn($rootScope, '$broadcast').and.callThrough();
		});
	});
  
	it('should display the elements correctly', function (){ 
		/* Checking that the directive adds the classes as expected */
		// Intro
		var intro = elm.find('#intro');
		expect(intro.length).toBe(1);
		expect(intro.hasClass('visibility-hidden')).toBe(true);
		// Bottom row
		var introBottomRow = elm.find('#intro-bottom-row');
		expect(introBottomRow.length).toBe(1);
			// github
			var github = introBottomRow.find('#dboom-github');
			expect(github.length).toBe(1);
			// share
			var scrollDownArrow = introBottomRow.find('#dboom-share');
			expect(scrollDownArrow.length).toBe(1);
	});	

    it('should be listening "active-section:cover" and act accordingly', inject(function($timeout, $templateCache){ 

		$rootScope.$broadcast('active-section:cover');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:cover');

		// Mocking the rocket ng-include
		$templateCache.put('/images/rocket.svg', '');

		// Intro
		var intro = elm.find('#intro');
		expect(intro.length).toBe(1);
		expect(intro.hasClass('animated fadeIn')).toBe(true);
		
		// Title
		$timeout.flush(1501);
		var introTitle = elm.find('#intro-title');
		expect(introTitle.length).toBe(1);

		$timeout.flush(3501);
		expect(introTitle.hasClass('animated flipOutX text-center')).toBe(true);

    }));

    it('should be listening "event:rocket-firstProjection" and act accordingly', inject(function($timeout){
		
		$rootScope.$broadcast('event:rocket-firstProjection');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:rocket-firstProjection');

		// Title
		$timeout.flush(1001);
		var goButton = elm.find('#go-button');
		expect(goButton.length).toBe(1);

    }));

    it('should be listening "event:rocket-tookoff" and act accordingly', inject(function($timeout){
		
		$rootScope.$broadcast('event:rocket-tookoff');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:rocket-tookoff');

		// Intro
		var intro = elm.find('#intro');
		expect(intro.length).toBe(1);
		expect(intro.hasClass('animated fadeOut')).toBe(true);

		// Title
		$timeout.flush(1001);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('app-starts');
    }));
    	
});