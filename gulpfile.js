const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const include = require('gulp-file-include');

gulp.task('server', () => {

	browserSync.init({
		server: {
			baseDir: 'build'
		},
		notify: false
	});

	gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('sass'));
	gulp.watch('src/**/*.html', gulp.parallel('html'));
	gulp.watch('src/js/**/*.js', gulp.parallel('scripts'));
	gulp.watch('src/js/**/*.+(jpg|png|svg|jpeg)', gulp.parallel('images'));
});

gulp.task('sass', () => {
	return gulp.src('src/sass/**/*.+(scss|sass)')
		.pipe(sass())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 versions'],
			browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			],
		}))
		.pipe(cleanCSS({
			compatibility: 'ie8',
			level: 2,
		}))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', () => {
	return gulp.src(['src/**/*.html', '!src/components/**/*.html'])
		.pipe(include())
		.pipe(gulp.dest('build'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', () => {
	return gulp.src('src/js/**/*.js')
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.reload({ stream: true }))
})

gulp.task('images', () => {
	return gulp.src('src/img/**/*.+(jpg|png|svg|jpeg)')
		.pipe(gulp.dest('build/img'))
		.pipe(browserSync.reload({ stream: true }))
})

gulp.task('default', gulp.parallel('html', 'sass', 'scripts', 'images', 'server'));