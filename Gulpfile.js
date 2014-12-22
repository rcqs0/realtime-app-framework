var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');

var scriptsPath = 'applications';

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('webpack', function() {
    var folders = getFolders(scriptsPath);

    var tasks = folders.map(function(folder) {
        // concat into foldername.js
        // write to output
        // minify
        // rename to folder.min.js
        // write to output again
        return gulp.src(path.join(scriptsPath, folder, '/client/*.js'))
            .pipe(webpack({
                output: {
                    filename: folder + '.js'
                },
                module: {
                    loaders: [
                        { test: /\.js$/, loader: 'jsx-loader' }, // loaders can take parameters as a querystring
                        { test: /\.json$/, loader: 'json-loader' }
                    ]
                }
            }))
            //.pipe(uglify())
            .pipe(gulp.dest('./assets/applications/'))
    });

    return merge(tasks);
});

gulp.task('watch', function () {
    gulp.watch(scriptsPath + '/**/*', ['webpack']);
});

gulp.task('default', ['webpack', 'watch']);