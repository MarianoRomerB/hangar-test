module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				files: {
					'css/style.css' : 'sass/style.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks ('grunt-contrib-sass');

};