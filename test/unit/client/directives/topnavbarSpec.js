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
  

    it('should be listening "event:activeArea" and act accordingly', function (){ 
		
    	/* If Cover, it must contract */
    	var area = 'Cover'; 
		$rootScope.$broadcast('event:activeArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', area);
		var header = elm.find('header');
		expect(header.length).toBe(1);
		expect(header.hasClass('expand')).toBe(false);

    });	

    it('should be listening "event:inactiveArea" and expand', function (){

    	/* If Cover, it must expand */
		var area = 'Cover'; 
		$rootScope.$broadcast('event:inactiveArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:inactiveArea', area);
		var header = elm.find('header.expand.navbar-fixed-top');
		expect(header.length).toBe(1);

		/* If Who I am, it must expand and the section active */
		area = 'Who I am';
		$rootScope.$broadcast('event:activeArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', area);
		var whoIAmLink = elm.find('#who-i-am-link');
		expect(whoIAmLink.length).toBe(1);
		expect(whoIAmLink.hasClass('active')).toBe(true);
        var whoIAmIcon = elm.find('#who-i-am-icon');
      	expect(whoIAmIcon.length).toBe(1);
      	expect(whoIAmIcon.hasClass('faa-spin')).toBe(true);

      			/* If Waht I like, it must expand and the section active */
		area = 'What I like';
		$rootScope.$broadcast('event:activeArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', area);
		var whatILikeLink = elm.find('#what-i-like-link');
		expect(whatILikeLink.length).toBe(1);
		expect(whatILikeLink.hasClass('active')).toBe(true);
        var whatILikeIcon = elm.find('#what-i-like-icon');
      	expect(whatILikeIcon.length).toBe(1);
      	expect(whatILikeIcon.hasClass('faa-pulse')).toBe(true);
    });	
});