const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const concat = require("gulp-concat");
const uglify = require('gulp-uglify-es').default;

// Static server
gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

		gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Sass|Scss Styles
gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({prefix: '', suffix: '.min'}))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// HTML minimize
gulp.task('html', function () {
	return gulp.src("src/*.html")
			.pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(gulp.dest("dist/"));
});

// Scripts
gulp.task('scripts', function () {
	return gulp.src([
		"src/libs/jQuery/jquery-3.6.0.min.js",
    "src/libs/slick/slick.min.js",
		"src/libs/fontawesome/all.min.js",
		"src/libs/prognroll/prognroll.js",
		"src/libs/jquery-validation/jquery.validate.min.js",
		"src/libs/maskedinput/jquery.maskedinput.min.js",
		"src/libs/wow/wow.min.js",
		"src/js/*.js"
	])
	.pipe(concat('script.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"))
	.pipe(browserSync.stream());
});

// Fonts
gulp.task('fonts', function () {
	return gulp.src("src/fonts/**/*")
			.pipe(gulp.dest("dist/fonts"));
});

// Icons
gulp.task('icons', function () {
	return gulp.src("src/icons/**/*")
			.pipe(gulp.dest("dist/icons"));
});

// Mailer
gulp.task('mailer', function () {
	return gulp.src("src/mailer/**/*")
			.pipe(gulp.dest("dist/mailer"));
});

// Images minimize
gulp.task('images', function () {
	return gulp.src("src/img/**/*")
			.pipe(imagemin())
			.pipe(gulp.dest("dist/img"));
});

// Watcher
gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
		gulp.watch("src/*.html").on('change', gulp.parallel('html'));
		gulp.watch(["src/js/**/*.js", "src/libs/**/*.js"], gulp.parallel('scripts'));
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images'));