const gulp = require('gulp');
const deploy = require("./tools/deploy.js");

console.log(deploy);

gulp.task('deploy', function () {
  return deploy.deployProject();
});

