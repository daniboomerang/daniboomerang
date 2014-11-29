module.exports = function(grunt) {

    grunt.initConfig({
        shell:{
            updateWebdriver: {
                command: 'npm run update-webdriver',
            },
            serverAsync: {
                command: 'node server.js',
                options: {
                    async: true,
                    execOptions: {
                        cwd: './'
                    },
                },    
            },
        },
        run: {
            server: {
                args: ['./server.js']
            },
        },    
        karma: {
            unit: {
                configFile: './test/karma.conf.js'
            },
            continuous: {
                configFile: './test/karma.conf.js',
                singleRun: true
            },
        },
        watch: {
            karma: {
                files: ['client/scripts/**/*.js', 'test/unit/client/**/*.js'],
                tasks: ['karma:unit:run']
            },
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

 
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-run');

    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('unitDEV', ['karma:unit', 'watch']);
    grunt.registerTask('unitCI', ['karma:continuous']);

    grunt.registerTask('serverAsync', ['shell:serverAsync']);    
    grunt.registerTask('updateWebdriver', ['shell:updateWebdriver']);    
    grunt.registerTask('server', ['run:server']);    

    grunt.registerTask('e2e', ['serverAsync', 'protractor']);
    grunt.registerTask('testDEV', ['updateWebdriver', 'e2e', 'unitDEV']);
    grunt.registerTask('testCI', ['updateWebdriver', 'e2e','unitCI']);
};