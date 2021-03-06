'use strict';
var gulp = require('gulp'),
    addsrc = require('gulp-add-src'),
    plugins = require('gulp-load-plugins')(),
    karmaServer = require('karma').Server,
    runSequence = require('run-sequence'),
    plumber = require('gulp-plumber'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    del = require('del'),
    supportedBrowser = ['last 2 versions','ie 7', 'ie 8', 'ie 9','ie 10', 'ie 11', 'android 2.3', 'android 4', 'opera 12'];

var basepath = {
    src: 'src/',
    build: 'htdocs/',
    test : 'test/'
};
var src = {
    assets: basepath.src+'assets/',
    images: basepath.src+'assets/images/',
    js: basepath.src+'assets/js/',
    sass: basepath.src+'assets/sass/',
    test : {
        karmaConfig : __dirname + '/karma.conf.js',
        unit : './test/unit/'
    }
};
var build = {
    assets: basepath.build+'assets/',
    images: basepath.build+'assets/images/',
    js: basepath.build+'assets/js/',
    css: basepath.build+'assets/css/'
};

var commonPackage = [
    'src/common/node_modules/bootstrap/dist/js/bootstrap.min.js'
];
 
var chartsPackage = [
    'src/charts/node_modules/highcharts/highcharts.js',
    'src/data/main.js'
];

var formsPackage = [
    'src/forms/forms.js'
];

var loaderPackage = [
    'src/loader.js'
];
/*=====================================================================
 JS TASKS
 ======================================================================*/
var fileCreation = function (pack, filename) {
    gulp.src(pack)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(debug({
            title: 'js'
        }))
        .pipe(concat(filename + '.js',{
            newLine: ''
        }))
        .pipe(sourcemaps.write('.', {
            sourceRoot: src.js
        }))
        .pipe(gulp.dest(build.js))
        .pipe(reload({
            stream: true
        }));
};

gulp.task('loader',function(){
    fileCreation(loaderPackage , "loader");
});
gulp.task('common',function(){
    fileCreation(commonPackage , "common");
});
gulp.task('charts',function(){
    fileCreation(chartsPackage , "charts");
});
gulp.task('forms',function(){
    fileCreation(formsPackage , "forms");
});



// testing related tasks
gulp.task('concat:test', function() {
    return gulp.src(loadScripts)
        .pipe(plugins.concat('all.js'))
        .pipe(gulp.dest(src.test.unit));
});

gulp.task('karma:init', function (done) {
    return new karmaServer({
        configFile: src.test.karmaConfig,
        singleRun: true
    }, done).start();
});

gulp.task('clean:test', function () {
    return del([
        src.test.unit+'all.js',
        src.test.unit+'result_html/**/*'
    ]);
});

gulp.task('test', function(done) {
    runSequence('clean:test','concat:test', 'karma:init');
    done();
});
/*=====================================================================
 CSS TASKS
 ======================================================================*/
gulp.task('sass',function(){
    gulp.src(src.sass+'all.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(concat('module.css'))
        .pipe(sass({
            includePaths: [src.sass]
        })).on('error',sass.logError)
        .pipe(autoprefixer({
            browsers: supportedBrowser,
            cascade: false
        }))
        .pipe(sourcemaps.write('.', {
            sourceRoot: src.sass
        }))
        .pipe(gulp.dest(build.css))
        .pipe(reload({
            stream: true
        }));
})
/*=====================================================================
 =           MOVE FOLDERS         =
 ======================================================================*/
gulp.task('html', function(){
    gulp.src(basepath.src+'*.html')
        .pipe(gulp.dest(basepath.build));

});
gulp.task('images', function(){
    return gulp.src(src.images+'*')
        .pipe(gulp.dest(build.images));
});

/*=====================================================================
 CLEAN TASKS
 ======================================================================*/
gulp.task('clear',function(done){
    return cache.clearAll(done);
});
gulp.task('clean', function(cb){
    del([basepath.build], cb);
});
/*=====================================================================
 WATCH TASK
 ======================================================================*/
gulp.task('watcher',function(){
    browserSync({
        server: basepath.build,
        index: "/index.html"
    });
    gulp.watch(src.js+'**/*.js',['js']);
    gulp.watch(src.sass+'*.scss',['sass']);
    gulp.watch(src.images+'*',['images']);
    gulp.watch(basepath.src+'*.html',['html']);
});
/*=====================================================================
 TASK RUNNERS
 ======================================================================*/
gulp.task('default',['sass','html','images','loader', 'common', 'charts' , 'forms']);
gulp.task('watch',['watcher']);
gulp.task('develop',['default','watch']);

