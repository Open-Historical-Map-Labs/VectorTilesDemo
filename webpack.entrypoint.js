// webpack entry point
// list JS files to include, CSS and SASS files to include, HTML templates to have [hash] replacement, etc.

require('core-js/fn/object/assign');
require('core-js/fn/object/entries');
require('./js/mbgl-polyfill.js');

require('./index.src.html');
require('./index.src.js');
require('./index.src.scss');
