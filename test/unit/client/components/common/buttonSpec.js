describe('Button', function() {
  
	var elm, scope;

	beforeEach(function (){

		module('button');
		module('htmlTemplates');

		inject(function($injector, $compile) {
	 		$rootScope = $injector.get('$rootScope');	   
			elm = angular.element("<button id='first-button' size='md' content-type='text' text='GO' is-toogled-button='true' spin-direction='right'></button><button id='second-button' size='sm' content-type='icon' icon-class='fa fa-fw fa-share-alt fa-2x' is-toogled-button='false' spin-direction='right'></button><button id='third-button' size='xs' content-type='icon' icon-class='fa fa-fw fa-share-alt fa-2x' is-toogled-button='true' spin-direction='right'></button>");
			scope = $rootScope;
			$compile(elm)(scope);
			scope.$digest();
		});
	});
  
  	// FIRST BUTTON
    it('should render a correct "MD-TEXT-ISTOOGLED-RIGHTSPING" button ', function (){ 
		/* Checking that the directive adds the classes as expected */
		// 3 button wrappers
		var buttonWrappers = elm.find('.dboom-button-wrapper');
		expect(buttonWrappers.length).toBe(3);

		// First button is md size and type text
		var mediumButtom = elm.find('.md');
		expect(mediumButtom.length).toBe(2);

		// Second button is sm size
		var smallButtom = elm.find('.sm');
		expect(smallButtom.length).toBe(2);

		// Third button is xs size
		var extraSmallButtom = elm.find('.xs');
		expect(extraSmallButtom.length).toBe(2);
    });	
});