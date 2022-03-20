const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('server', () => {

	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false
	});

	gulp.watch('app/sass/**/*.+(scss|sass)', gulp.parallel('sass'));
	gulp.watch('app/**/*.html', gulp.parallel('html'));
});

gulp.task('sass', () => {
	return gulp.src('app/sass/**/*.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', () => {
	return gulp.src('app/**/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('default', gulp.parallel('sass', 'server'));