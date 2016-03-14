Front-end gulp dev stack.

## Features
- **CSS:**
    - [LESS](https://github.com/plus3network/gulp-less)
    - [Postcss](https://github.com/postcss/postcss) ([autoprefixer](https://github.com/postcss/autoprefixer), [cssnano](https://github.com/ben-eb/cssnano))
    - [Sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
- **JS:**
    - [Eslint](http://eslint.org)
    - [Browserify](http://browserify.org) w/ [Watchify](https://github.com/substack/watchify) for faster rebuilds
    - [Babel](http://babeljs.io)
    - [Uglify](https://github.com/terinjokes/gulp-uglify)
- **HTML:**
    - [Nunjucks](https://github.com/sindresorhus/gulp-nunjucks) for static templating
    - [Prettify](https://github.com/jonschlinkert/gulp-prettify)
- **Development mode:**
    - File Watching and Live Reloading with [BrowserSync](http://www.browsersync.io/)
    - Autogenerated index of HTML templates
- **Production mode**
    - JS and CSS are uglified and minified
    - Local production server for testing
- **Deployment**
    - `todo`

## Usage

Make sure you have [Node](https://nodejs.org) installed.

Install gulp globally: `npm install -g gulp`.

### Development

Run `gulp --dev` and develop happily in `src` folder.

### Production build

Run `gulp` and pick built assets from `dist` folder.
