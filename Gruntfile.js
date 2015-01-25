module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'build/assets/js/*.js',
                dest: 'assets/js/script.min.js'
            }
        },
        imagemin: {
            build: {
                optimizationLevel: 1,
                svgoPlugins: [{ removeViewBox: false }],
                progressive: true
            },
            files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'build/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'assets/img'                  // Destination path prefix
			}]
		},
        font_optimizer: {
            build: {
                options: {
                    chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' 
                },
                files: {
                    'assets/fonts': ['build/assets/fonts/*.ttf']
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/assets/css/styles.css': 'build/assets/scss/main.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'assets/css/styles.css': 'build/assets/scss/main.scss'
                }
            }
        },
        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            js: {
                files: ['build/assets/js/*.js'],
                tasks: ['uglify:dev']
            },
            css: {
                files: ['build/assets/scss/*.scss'],
                tasks: ['sass:dev']
            }
        },
        concurrent: {
            build: ['uglify', 'imagemin', 'sass', 'font_optimizer']
        }      
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-font-optimizer');
    grunt.loadNpmTasks('grunt-concurrent');
        
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concurrent']);
};