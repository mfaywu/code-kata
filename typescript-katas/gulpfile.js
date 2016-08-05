var gulp = require('gulp'),
    exec = require('child_process').exec,
    typescript = require('gulp-typescript'),
    runSequence = require('run-sequence');
  
var tsSource = 'katas/src/**/*.ts',
    codePattern = 'katas/built/**/code/*.js';
  
gulp.task('compile', function(){
  gulp.src(tsSource)
      .pipe(typescript())
      .pipe(gulp.dest('./katas/built'));
});

gulp.task('test', function(){
  exec('karma start', function(err){
    console.log(err ? err : 'Karma server running');
  });
});

gulp.task('default', function(){
  runSequence('compile', 'test');
 
  gulp.watch(tsSource, ['compile']);
});
