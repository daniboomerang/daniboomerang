var daniboomerangControllers = angular.module('daniboomerangControllers', []);


daniboomerangControllers.controller('MyCtrl', function($scope, $document){
    $document.on('scroll', function() {
      console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
    });
     var work = $document.find('#work');
    console.log(work.scrollTop());
    work.on('scroll', function() {
      console.log('Container scrolled to ', work.scrollLeft(), work.scrollTop());
    });
  });