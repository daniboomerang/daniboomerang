module.exports = function(grunt) {

    grunt.initConfig({
        karma: {
            unit: {
                configFile: './test/karma.conf.js',
                background: true
            }
        },
        watch: {
            karma: {
                files: ['client/scripts/**/*.js', 'test/unit/client/**/*.js'],
                tasks: ['karma:unit:run']
            }
        },
        protractor: {
            options: {
              configFile: "./test/karma-e2e.conf.js",
              keepAlive: true, // The grunt process stops when the test fails.
              noColor: false, // We use colors in its output.
              args: { }
            },
            all: { },
        },
    });

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('unit', ['karma:unit', 'watch']);
    grunt.registerTask('unitNoWatch', ['karma:unit']);

    grunt.registerTask('e2e', ['protractor']);
    grunt.registerTask('testDevMode', ['e2e','unit']);
    grunt.registerTask('test', ['e2e','unit']);
};