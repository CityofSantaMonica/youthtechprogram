var gulp = require('gulp');
var spawn = require('child_process').spawn;
var tinylr = require('tiny-lr')();
var jekyllPid;

function notifyLiveReload(event) {
    var fileName = require('path').relative(__dirname, event.path);

    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('jekyll-build', function() {
    if (jekyllPid) { jekyllPid.kill(); }

    jekyllPid = spawn("bundle", ['exec', 'jekyll', 'build', '--watch'], {stdio: 'inherit'});
});

gulp.task('express', function() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({port: 35729}));
    app.use(express.static(__dirname + "/_site"));
    app.listen(8000, '0.0.0.0');
});

gulp.task('livereload', function() {
    tinylr.listen(35729);
});

gulp.task('watch', function() {
    gulp.watch('_config.yml', ['jekyll-build']);
    gulp.watch(['_site/**/*'], notifyLiveReload);
});

gulp.task('default', ['jekyll-build', 'express', 'livereload', 'watch']);
