var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var browserify = require('browserify');

var source = require('vinyl-source-stream');

gulp.task('build', function () {
  gulp.src(['./js/postcard.js', './js/!(postcard)*.js'])
    .pipe(uglify())
    .pipe(concat('postcard.min.js'))
    .pipe(gulp.dest('./build'));
});



gulp.task('watch', function() {

	watch('css/**/*.less', function () {

        // return gulp.src('./less/**/*.less')
        // .pipe(less({
        //   paths: [ path.join(__dirname, 'less', 'includes') ]
        // }))
        // .pipe(gulp.dest('./public/css'));
    });



});

gulp.task('default', ['build']);