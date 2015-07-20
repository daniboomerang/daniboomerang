describe('Top navbar', function() {
  
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
	        spyOn($rootScope, '$broadcast').and.callThrough();
		});
	});
  
    it('should be listening "event:activeArea" and act accordingly', function (){ 
		
    	/* If cover, it must contract */
		$rootScope.$broadcast('active-section:cover');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:cover');
		var header = elm.find('header');
		expect(header.length).toBe(1);
		expect(header.hasClass('expand')).toBe(false);

		/* If contact, it must contract */
		$rootScope.$broadcast('active-section:contact');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:contact');
		var header = elm.find('header');
		expect(header.length).toBe(1);
		expect(header.hasClass('expand')).toBe(false);

    	/* about, loving, or work it must expand */
		var sectionEvents = ['active-section:about','active-section:loving','active-section:work'];
		var randomSection = sectionEvents[Math.floor((Math.random() * 3))];
		$rootScope.$broadcast(randomSection);
		expect($rootScope.$broadcast).toHaveBeenCalledWith(randomSection);
		header = elm.find('header.expand.navbar-fixed-top');
		expect(header.length).toBe(1);
    });	

    it('should be listening "event:inactiveArea" and expand', function (){

		/* If About, it must expand and set the section active */
		$rootScope.$broadcast('active-section:about');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:about');
		var aboutLink = elm.find('#about-link');
		expect(aboutLink.length).toBe(1);
		expect(aboutLink.hasClass('active')).toBe(true);
        var aboutIcon = elm.find('.about-icon');
      	expect(aboutIcon.length).toBe(2);
      	expect(aboutIcon.hasClass('spin-right-whole-fastest')).toBe(true);

      	/* If Loving, it must expand and set the section active */
		$rootScope.$broadcast('active-section:loving');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:loving');
		var lovingLink = elm.find('#loving-link');
		expect(lovingLink.length).toBe(1);
		expect(lovingLink.hasClass('active')).toBe(true);
        var lovingIcon = elm.find('.loving-icon');
      	expect(lovingIcon.length).toBe(2);
      	expect(lovingIcon.hasClass('pulsing')).toBe(true);


		/* If Work, it must expand and set the section active */
		$rootScope.$broadcast('active-section:work');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:work');
		var workLink = elm.find('#work-link');
		expect(workLink.length).toBe(1);
		expect(workLink.hasClass('active')).toBe(true);
        var workIcon = elm.find('.work-icon');
      	expect(workIcon.length).toBe(2);
      	expect(workIcon.hasClass('pulsing')).toBe(true);

      	/* If Contact, it must NOT expand navbar */
		$rootScope.$broadcast('active-section:contact');
		expect($rootScope.$broadcast).toHaveBeenCalledWith('active-section:contact');
		var contactLink = elm.find('#contact-link');
		expect(contactLink.length).toBe(1);
		expect(contactLink.hasClass('active')).toBe(false);
        var contactIcon = elm.find('.contact-icon');
      	expect(contactIcon.length).toBe(2);
      	expect(contactIcon.hasClass('pulsing')).toBe(false);
    });	
});