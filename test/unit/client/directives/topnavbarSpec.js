describe('navbar', function() {
  
	var elm, scope;

	beforeEach(function (){

		module('daniboomerangDirectives');
		module('htmlTemplates');

		inject(function($injector, $compile) {

	 		$rootScope = $injector.get('$rootScope');	   
			elm = angular.element('<topnavbar></topnavbar>');
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

    	/* If something different to cover, cover it must expand */
		area = 'SomethingElse'; 
		$rootScope.$broadcast('event:activeArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', area);
		header = elm.find('header.expand.navbar-fixed-top');
		expect(header.length).toBe(1);
    });	

    it('should be listening "event:inactiveArea" and expand', function (){

		/* If About, it must expand and set the section active */
		area = 'About';
		$rootScope.$broadcast('event:activeArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', area);
		var aboutLink = elm.find('#about-link');
		expect(aboutLink.length).toBe(1);
		expect(aboutLink.hasClass('active')).toBe(true);
        var aboutIcon = elm.find('#about-icon');
      	expect(aboutIcon.length).toBe(1);
      	expect(aboutIcon.hasClass('faa-spin')).toBe(true);

      	/* If Loving, it must expand and set the section active */
		area = 'Loving';
		$rootScope.$broadcast('event:activeArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', area);
		var lovingLink = elm.find('#loving-link');
		expect(lovingLink.length).toBe(1);
		expect(lovingLink.hasClass('active')).toBe(true);
        var lovingIcon = elm.find('#loving-icon');
      	expect(lovingIcon.length).toBe(1);
      	expect(lovingIcon.hasClass('faa-pulse')).toBe(true);


		/* If Work, it must expand and set the section active */
		area = 'Work';
		$rootScope.$broadcast('event:activeArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', area);
		var workLink = elm.find('#work-link');
		expect(workLink.length).toBe(1);
		expect(workLink.hasClass('active')).toBe(true);
        var workIcon = elm.find('#work-icon');
      	expect(workIcon.length).toBe(1);
      	expect(workIcon.hasClass('faa-pulse')).toBe(true);

      	/* If Contact, it must expand and set the section active */
		area = 'Contact';
		$rootScope.$broadcast('event:activeArea', area);
		expect($rootScope.$broadcast).toHaveBeenCalledWith('event:activeArea', area);
		var contactLink = elm.find('#contact-link');
		expect(contactLink.length).toBe(1);
		expect(contactLink.hasClass('active')).toBe(true);
        var contactIcon = elm.find('#contact-icon');
      	expect(contactIcon.length).toBe(1);
      	expect(contactIcon.hasClass('faa-pulse')).toBe(true);
    });	
});