module.exports = function (grunt) {
    var config = {}, build = [];


    // basic
    {
        config.pkg =  grunt.file.readJSON('package.json');

        grunt.loadNpmTasks('grunt-contrib-watch');
        config.watch = {};
    }


    // js
    {
        grunt.loadNpmTasks('grunt-auto-deps');
        config.auto_deps = {
            dev: {
                scripts: ['IconHanabi'],
                loadPath: ['src/js/*.js', 'src/js/lib/*.js'],
                locate: {
                    $: 'src/js/lib/jquery.js',
                    EventDispatcher: 'components/eventdispatcher.js/src/EventDispatcher.js'
                }
            }
        };

        config.watch.js = {
            files: ['src/js/*.js', 'src/js/**/*.js'],
            tasks: ['auto_deps:dev']
        };

        build.push('auto_deps:dev');
    }


    // css
    {
        grunt.loadNpmTasks('grunt-contrib-compass');

        config.compass =  {
            dev: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'css',
                    imagesDir: 'img',
                    httpImagesPath: '../img',
                    javascriptsDir: 'js',
                    environment: 'development'
                }
            }
        };

        config.watch.css = {
            files: ['src/sass/*.scss', 'src/sass/**/*.scss'],
            tasks: ['compass:dev']
        };

        build.push('compass:dev');
    }


    // ejs


    // test


    // server
    {
        grunt.loadNpmTasks('grunt-koko');
        config.koko = {
            dev: {
                root: '',
                openPath: '/index.html'
            }
        };

        grunt.registerTask('server', ['koko:dev']);
    }


    // init
    grunt.initConfig(config);
    grunt.registerTask('build', build);
    grunt.registerTask('default', ['build']);
};