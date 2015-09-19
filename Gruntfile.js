module.exports = function(grunt) {

    // load time-grunt and all grunt plugins found in the package.json
    require( 'load-grunt-tasks' )( grunt );

    // Customise the browser used by BrowserSync, example: `grunt --canary`
    var browser = 'default';
    if(grunt.option('canary')){ browser = 'Google Chrome Canary'; };

    grunt.initConfig({
        // Sass
        sass: {
            dist: {
                files: {
                    'css/default.css': '_scss/default.scss',
                }
            }
        },

        // Browser Sync
        browserSync: {
            dev: {
                bsFiles: {
                    src : ["_site/*.*", '_site/css/*.css',]
                },
                options: {
                    port: 1234, // OPPO (OP)en(PO)lice on phone keypad
                    open: true, // Opens site in your default browser, no need to remember the port
                    notify: false,
                    watchTask: true,
                    injectChanges: false,
                    browser: browser,
                    server: {
                        baseDir: '_site'
                    }
                }
            }
        },

        // Shell commands
        shell: {
            jekyllBuild: {
                command: 'bundle exec jekyll build --config _config.yml'
            },
            bower: {
                command: 'bower update && bower install' // Run update before install to avoid version collisions
            }
        },

        // Watch
        watch: {
            css: {
                files:'**/**/*.scss',
                tasks: ['sass'],
                options: {
                    interrupt: false,
                    atBegin: true
                }
            },
            jekyll: {
                files: [
                    // Including
                    '_data/*.*',
                    '_includes/*.*',
                    '_includes/**/*.*',
                    '_layouts/*.*',
                    '_plugins/*.*',
                    'css/*.*',
                    'images/*.*',
                    'images/**/*.*',
                    'js/*.*',
                    'index.html',
                ],
                tasks: ['shell:jekyllBuild'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        }
    });

    grunt.registerTask('default', ['browserSync', 'watch']);
};
