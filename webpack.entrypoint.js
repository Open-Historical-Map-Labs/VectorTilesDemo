// webpack entry point
// list JS files to include, CSS and SASS files to include, HTML templates to have [hash] replacement, etc.

require('core-js/fn/object/assign');
require('./mbgl-polyfill.js');

require('./mbgl-control-timeslider.css');

require('./index.src.html');
require('./index.src.js');
require('./index.src.scss');
