import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'

module.exports = {
  input: 'dev/js/app.js',
  output: {
    file: 'dist/js/app.js',
    format: 'iife',
    globals: {
      composi: 'composi'
    }
  },
  plugins: [
      babel({
        runtimeHelpers: true
      }),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs(),
      minify({
        mangle: { topLevel: true },
        comments: false
      })
    ]
}