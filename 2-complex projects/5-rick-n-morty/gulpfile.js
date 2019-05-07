const gulp = require('gulp')
const browserSync = require('browser-sync')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const gzip = require('gulp-gzip')
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss')
const pkg = require('./package.json')
const minify = require('rollup-plugin-babel-minify')

gulp.task('build:js', function (done) {
  rollup.rollup({
    input: './src/js/app.js',
    plugins: [
      babel(),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      // minify({
      //   mangle: { topLevel: true },
      //   comments: false
      // })
    ]
  })
    .then((bundle) => {
      return bundle.write({
        format: 'iife',
        name: 'app',
        file: './dist/js/app.js',
        sourcemap: true
      })
    })
    .then((bundle) => {
      return gulp.src('./dist/js/app.js')
        .pipe(gzip({ extension: 'gzip' }))
        .pipe(gulp.dest('./dist/js'))
    })
    .then((bundle) => {
      done();
    })
})

gulp.task('build:css', function (done) {
  const plugins = [cssnano({ advanced: true, aggressiveMerging: false })]
  gulp.src('./src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
  gulp.src('./dist/css/*.css')
    .pipe(gzip({ extension: 'gzip' }))
    .pipe(gulp.dest('./dist/css'))
  done()
})

gulp.task('move-images', function (done) {
  gulp.src(['./src/images/*', './src/images/**/*'])
    .pipe(gulp.dest('./dist/images'))
  done()
})


const server = browserSync.create();

function reload() {
  server.reload();
}

function serve(done) {
  setTimeout(() => {
    server.init({
      port: 4040,
      server: {
        open: false,
        baseDir: './'
      }
    })
    done()
  }, 250)
}

gulp.task('watch', function (done) {
  gulp.watch('./index.html').on('change', reload)
  gulp.watch(['./src/js/app.js', 'src/js/**/*']).on('change', gulp.series('build:js', reload))
  gulp.watch('./src/css/*.css').on('change', gulp.series('build:css', reload))
  done()
})

// Process app.js and load page in browser:
gulp.task('default', gulp.series('build:js', 'build:css', 'move-images', 'watch', serve), function (done) {
  done()
})

gulp.task('fresh-build', gulp.series('build:js', 'build:css', 'move-images'), function (done) {
  done()
})

// Create production-ready version of this project.
gulp.task('production', function (done) {
  const name = pkg.name + '-production'
  gulp.src(['./dist/**/*', './dist/**/**/*'])
    .pipe(gulp.dest(`../${name}/dist`))
  gulp.src('./index.html')
    .pipe(gulp.dest(`../${name}`))
  done()
})
