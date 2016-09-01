module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/main.css': 'sass/main.sass'
        },
		files: {
		  'css/style.css': 'sass/style.sass'
        }}},
  watch: {
    scripts: {
        files: ['sass/*.sass'],
        tasks: ['sass'],
        options: {
            spawn: false,
        },
    }},
  browserSync: {
		dev: {
			bsFiles: {
				src : [
					'css/**/*.css',
					'*.html',
					'js/**/*.js',
					'html/**/*.html'
				]
			},
			options: {
				watchTask: true,
				server: './'
			}}},
	imagemin: {
		dynamic: {
			files: [{
				expand: true,
				cwd: 'img/',
				src: ['**/*.{png,jpg,gif}'],
				dest: 'img-opt/'
			}]
		}}
  });
  // Load the plugins tasks 
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
	
  // Default task(s).
  grunt.registerTask('default', [ 'imagemin', 'sass', 'browserSync', 'watch' ]);
};
