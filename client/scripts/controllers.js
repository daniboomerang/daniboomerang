var daniboomerangControllers = angular.module('daniboomerangControllers', []);

daniboomerangControllers.controller('LayoutCtrl', function ($scope){

	init();

	function init(){
		$scope.isToggledMenu = true;
		$scope.currentSection = "Who I am";
		$scope.activeSection = "Who";
	}

});

daniboomerangControllers.controller('NavbarCtrl', function ($scope){
	
	$scope.toggleMenu = function(){
		$scope.$parent.isToggledMenu = !$scope.$parent.isToggledMenu;
	}

	$scope.isToggledMenu = function(){
		return $scope.$parent.isToggledMenu;
	}

});

daniboomerangControllers.controller('SidebarCtrl', function ($scope){

	init();

	function init(){

		$scope.sidebar = {};
		$scope.sidebar.sections =
		[
			{
				section: 'Who I am',
				sectionAcronym: 'Who',
				sectionURL: 'whoIAm',
				sectionImg: '/images/boomerang-white-24.svg'
			},
			{
				section: 'What I like',
				sectionAcronym: 'What',
				sectionURL: 'whatILike',
				sectionImg: '/images/heart-24.png'
			},
					{
				section: "What I've done",
				sectionAcronym: 'Github',
				sectionURL: 'whatIveDone',
				sectionImg: '/images/github-24.png'
			},
			{
				section: "What I've learnt",
				sectionAcronym: 'CV',
				sectionURL: 'whatIveLearnt',
				sectionImg: '/images/cv-24.png'
			},
			{
				section: 'Status',
				sectionAcronym: 'Status',
				sectionURL: 'Status',
				sectionImg: '/images/unlock-24.png'
			},
			{
				section: 'Contact',
				sectionAcronym: 'Contact',
				sectionURL: 'Contact',
				sectionImg: '/images/contact-24.png'
			}
		];
		
		$scope.activeSection = $scope.$parent.activeSection;

	}

});

daniboomerangControllers.controller('SidebarResponsiveCtrl', function ($scope){

	init();

	$scope.isToggledMenu = function(){
		return $scope.$parent.isToggledMenu;
	}

	function init(){

		$scope.sidebarResponsive = {};
		$scope.sidebarResponsive.sections =
		[
			{
				section: 'Who I am',
				sectionAcronym: 'Who',
				sectionURL: 'whoIAm',
				sectionImg: '/images/boomerang-white-24.svg'
			},
			{
				section: 'What I like',
				sectionAcronym: 'What',
				sectionURL: 'whatILike',
				sectionImg: '/images/heart-24.png'
			},
					{
				section: "What I've done",
				sectionAcronym: 'Github',
				sectionURL: 'whatIveDone',
				sectionImg: '/images/github-24.png'
			},
			{
				section: "What I've learnt",
				sectionAcronym: 'CV',
				sectionURL: 'whatIveLearnt',
				sectionImg: '/images/cv-24.png'
			},
			{
				section: 'Status',
				sectionAcronym: 'Status',
				sectionURL: 'Status',
				sectionImg: '/images/unlock-24.png'
			},
			{
				section: 'Contact',
				sectionAcronym: 'Contact',
				sectionURL: 'Contact',
				sectionImg: '/images/contact-24.png'
			}
		];

		$scope.activeSection = $scope.$parent.activeSection; 

	}

});
