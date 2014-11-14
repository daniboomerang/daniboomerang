module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'client/scripts/vendor/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/scripts/**/*.js',
      'client/scripts/vendor/ngresize.js',
      'client/**/*.js',
      'test/unit/client/**/*.js',
      'test/unit/client/mocks/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome']

  });
};
