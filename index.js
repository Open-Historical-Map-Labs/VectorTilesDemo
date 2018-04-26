/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(30)
  , createDesc = __webpack_require__(35);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(8)
  , defined = __webpack_require__(5);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _maplayers = __webpack_require__(18);

var _mbglControlTimeslider = __webpack_require__(17);

var MIN_ZOOM = 3;
var MAX_ZOOM = 10;
var START_ZOOM = 3;
var START_CENTER = [-99.5, 37.9];

window.MAP = undefined;

$(document).ready(function () {
    //
    // basic map
    //
    MAP = new mapboxgl.Map({
        container: "map",
        style: _maplayers.GLMAP_STYLE,
        zoom: START_ZOOM,
        center: START_CENTER,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM
    });

    MAP.addControl(new mapboxgl.NavigationControl());

    MAP.TIMESLIDER = new _mbglControlTimeslider.TimeSliderControl({
        year: 1790,
        min: 1790,
        max: 2000,
        step: 10,
        maplayerids: ['state-boundaries-historical', 'county-boundaries-historical']
    });
    MAP.addControl(MAP.TIMESLIDER);

    //
    // mouse-hover for an informational popup
    // the mousemove handler is set up after the load has fired, to avoid annoying console errors when the mouse is moved while it's still loading
    // the technique used below creates a 3px buffer around the point, and queries that
    // for polygon data this isn't necessary, but we'll likely work in point and line data some day and this works for those as well
    //
    MAP.POPUP = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    MAP.on('load', function () {
        MAP.on('mousemove', function (event) {
            var tooltip_layer_ids = ['state-boundaries-historical', 'county-boundaries-historical'];
            var pxbuffer = 3;
            var canvas = MAP.getCanvasContainer();
            var rect = canvas.getBoundingClientRect();
            var glpoint = new mapboxgl.Point(event.originalEvent.clientX - rect.left - canvas.clientLeft, event.originalEvent.clientY - rect.top - canvas.clientTop);
            var pixelbox = [[glpoint.x - pxbuffer, glpoint.y - pxbuffer], [glpoint.x + pxbuffer, glpoint.y + pxbuffer]];
            var features = MAP.queryRenderedFeatures(pixelbox, { layers: tooltip_layer_ids });

            if (features.length) {
                // open a popup
                var attribs = features[0].properties;
                // console.log(attribs);

                var description = '\n                    <h1>' + attribs.NAME + '</h1>\n                    <p>' + attribs.START + ' to ' + attribs.END + '</p>\n                    <p>' + attribs.CHANGE + '</p>\n                ';
                MAP.POPUP.setLngLat(event.lngLat).setHTML(description).addTo(MAP);
            } else {
                // remove the popup
                MAP.POPUP.remove();
            }
        });
    });

    //
    // startup and initial state, once the GL Map has loaded
    //
    MAP.on('load', function () {
        // nothing else to do here; controls all have their own map.load handlers to fire up their dynamic actions
        // this is where one would load a querystring/hash to set up initial state: filtering and layer visibility, etc.
    });
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * prototype extensions for Mapbox GL JS Map objects
 * Note that some of these have hardcoded assumptions e.g. a GLMAP_STYLE exists which lists the initial Style object passed to the Map
 *
 * For more info on creating MBGL controls, see https://www.mapbox.com/blog/build-mapbox-gl-js-plugins/
 */

//

// convenience methods to filter all map layers by a given source and layername

// for our needs, this basically identifies what we think of as a layer: a collection of classified features from one source and layer, despite their different styling

// convenience methods to filter all map layers by a given source and layername, or just by source

// and to toggle those layers


mapboxgl.Map.prototype.getLayersInSourceAndLayer = function (sourcename, layername) {

    // console.log([ 'getLayersInSourceAndLayer()', this, sourcename, layername ]);

    var layers = this.getStyle().layers.filter(function (layerdefinition) {

        if (layername) {

            return layerdefinition.source === sourcename && layerdefinition['source-layer'] === layername;
        } else {

            return layerdefinition.source === sourcename;
        }
    });

    return layers;
};

mapboxgl.Map.prototype.toggleLayersByGroup = function (sourcename, layername, visible) {

    // console.log([ 'toggleLayersByGroup()', sourcename, layername, visible ]);

    var viz = visible ? 'visible' : 'none';

    var layers = this.getLayersInSourceAndLayer(sourcename, layername);

    // console.log(layers);


    layers.forEach(function (maplayer) {

        MAP.setLayoutProperty(maplayer.id, 'visibility', viz);
    });
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
module.exports = __webpack_require__(1).Object.assign;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(44);

var TimeSliderControl = exports.TimeSliderControl = function () {
    function TimeSliderControl(options) {
        _classCallCheck(this, TimeSliderControl);

        if (!options) options = {};

        this.options = Object.assign({
            year: 1950,
            min: 1900,
            max: 2000,
            step: 10,
            maplayerids: []
        }, options);
    }

    _createClass(TimeSliderControl, [{
        key: "onAdd",
        value: function onAdd(map) {
            var _this = this;

            this._map = map;

            this._container = document.createElement("div");
            this._container.className = "mapboxgl-ctrl mbgl-control-timeslider";

            // slider element, with min/max/value from options
            this._slider = document.createElement('input');
            this._slider.type = "range";
            this._slider.min = this.options.min;
            this._slider.max = this.options.max;
            this._slider.step = this.options.step;
            this._slider.value = this.options.year;
            this._container.appendChild(this._slider);

            this._slider.addEventListener('change', function () {
                _this.updateOnChange();
            });

            // apply our action when the map first loads
            this._map.on('load', function () {
                _this.updateOnChange();
            });

            // done
            return this._container;
        }
    }, {
        key: "onRemove",
        value: function onRemove() {
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        }
    }, {
        key: "getDefaultPosition",
        value: function getDefaultPosition() {
            return 'top-left';
        }
    }, {
        key: "selectYear",
        value: function selectYear(year) {
            this._slider.value = year;
            this.updateOnChange();
        }
    }, {
        key: "updateOnChange",
        value: function updateOnChange() {
            var _this2 = this;

            // console.log([ 'updateOnChange()', this._slider.value ]);

            var year = this._slider.value;
            var startdate = parseInt(year) + '/01/01';
            var enddate = parseInt(year) + '/12/31';
            var layerids = this.options.maplayerids;

            var layers = this._map.getStyle().layers.filter(function (maplayer) {
                return layerids.indexOf(maplayer.id) >= 0;
            });
            layers.forEach(function (maplayer) {
                // filters are defined in maplayers.js and are known to be: all, START filter, END filter
                // plug in the year with /01/01 and /12/31 to form a date range
                // then apply it (workaround for bug, that one must null it first, here in this app only, today)
                var newfilters = maplayer.filter.slice();
                newfilters[1][2] = startdate;
                newfilters[2][2] = enddate;
                _this2._map.setFilter(maplayer.id, null);
                _this2._map.setFilter(maplayer.id, ['all', ['<=', 'START', startdate], ['>', 'END', enddate]]);
            });
        }
    }]);

    return TimeSliderControl;
}();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * A MB Style object, used as-is by the Mapbox GL map define layers, styles, basemap options, etc
 * Broken into a separate file for more modular version control, so design folks can mess with it with fewer merge conflicts
 * This file being a JSON-like structure, but not a JSON document, we have certain liberties such as commenting and variable interpolation.
 *
 * While this structure can be READ at startup to create UI etc,
 * the official source of truth once the map is running would be MAP.getStyle().layers
 * which would reflect the actual state of the layers at that time: changed visibility, style & filters, ...
 */

var VECTILES_BASE_URL = exports.VECTILES_BASE_URL = "http://ec2-54-202-248-255.us-west-2.compute.amazonaws.com/ohm/tiles/";

var STATES_MIN_ZOOM = exports.STATES_MIN_ZOOM = 3;
var COUNTIES_MIN_ZOOM = exports.COUNTIES_MIN_ZOOM = 6;

var GLMAP_STYLE = exports.GLMAP_STYLE = {
  "version": 8,
  "name": "mandesdemo",
  "sources": {
    "states-historical": {
      "type": "vector",
      "tiles": [VECTILES_BASE_URL + "states-historical/{z}/{x}/{y}.pbf"]
    },
    "counties-historical": {
      "type": "vector",
      "tiles": [VECTILES_BASE_URL + "counties-historical/{z}/{x}/{y}.pbf"]
    },
    "states-modern": {
      "type": "vector",
      "tiles": [VECTILES_BASE_URL + "states-modern/{z}/{x}/{y}.pbf"]
    },
    "counties-modern": {
      "type": "vector",
      "tiles": [VECTILES_BASE_URL + "counties-modern/{z}/{x}/{y}.pbf"]
    },
    "basemap-light": {
      "type": "raster",
      "tiles": ["https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png", "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png", "https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png", "https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"],
      "tileSize": 256
    },
    "basemap-labels": {
      "type": "raster",
      "tiles": ["https://a.tiles.mapbox.com/v3/greeninfo.map-qwnj26en/{z}/{x}/{y}.png", "https://b.tiles.mapbox.com/v3/greeninfo.map-qwnj26en/{z}/{x}/{y}.png", "https://c.tiles.mapbox.com/v3/greeninfo.map-qwnj26en/{z}/{x}/{y}.png", "https://d.tiles.mapbox.com/v3/greeninfo.map-qwnj26en/{z}/{x}/{y}.png"],
      "tileSize": 256
    }
  },
  "sprite": "https://openmaptiles.github.io/osm-bright-gl-style/sprite",
  "glyphs": "https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=RiS4gsgZPZqeeMlIyxFo",
  "layers": [{
    "id": "basemap-light",
    "type": "raster",
    "source": "basemap-light"
  }, {
    "id": "state-boundaries-historical",
    "source": "states-historical",
    "source-layer": "states",
    "type": "fill",
    "minzoom": STATES_MIN_ZOOM,
    "paint": {
      "fill-color": "rgb(168, 74, 0)",
      "fill-outline-color": "rgb(0, 0, 0)"
    },
    "layout": {
      "visibility": "none"
    },
    "filter": ['all', ["<=", "START", "9999/12/31"], [">", "END", "9999/12/31"]] // filter: start date and end date clauses, drop in a year to see what had any presence during that year
  }, {
    "id": "county-boundaries-historical",
    "source": "counties-historical",
    "source-layer": "counties",
    "type": "fill",
    "minzoom": COUNTIES_MIN_ZOOM,
    "paint": {
      "fill-color": "rgb(241, 168, 66)",
      "fill-outline-color": "rgb(0, 0, 0)"
    },
    "layout": {
      "visibility": "visible"
    },
    "filter": ['all', ["<=", "START", "9999/12/31"], [">", "END", "9999/12/31"]] // filter: start date and end date clauses, drop in a year to see what had any presence during that year
  }, {
    "id": "state-boundaries-modern-fill",
    "source": "states-modern",
    "source-layer": "states",
    "type": "fill",
    "minzoom": STATES_MIN_ZOOM,
    "paint": {
      "fill-color": "white",
      "fill-opacity": 0,
      "fill-outline-color": "rgb(0, 0, 0)"
    },
    "layout": {
      "visibility": "visible"
    }
  }, {
    "id": "state-boundaries-modern-line",
    "source": "states-modern",
    "source-layer": "states",
    "type": "line",
    "minzoom": STATES_MIN_ZOOM,
    "paint": {
      "line-color": "black",
      "line-width": 4
    },
    "layout": {
      "visibility": "visible"
    }
  }, {
    "id": "county-boundaries-modern-fill",
    "source": "counties-modern",
    "source-layer": "counties",
    "type": "fill",
    "minzoom": COUNTIES_MIN_ZOOM,
    "paint": {
      "fill-color": "white",
      "fill-opacity": 0,
      "fill-outline-color": "rgb(0, 0, 0)"
    },
    "layout": {
      "visibility": "visible"
    }
  }, {
    "id": "county-boundaries-modern-line",
    "source": "counties-modern",
    "source-layer": "counties",
    "type": "line",
    "minzoom": COUNTIES_MIN_ZOOM,
    "paint": {
      "line-color": "black",
      "line-width": 2
    },
    "layout": {
      "visibility": "visible"
    }
  }, {
    "id": "basemap-labels",
    "type": "raster",
    "source": "basemap-labels",
    "paint": {
      "raster-opacity": 0.50
    },
    "layout": {
      "visibility": "none"
    }
  }]
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// webpack entry point
// list JS files to include, CSS and SASS files to include, HTML templates to have [hash] replacement, etc.

__webpack_require__(14);
__webpack_require__(13);

__webpack_require__(16);
__webpack_require__(12);
__webpack_require__(15);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10)
  , toLength  = __webpack_require__(40)
  , toIndex   = __webpack_require__(39);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(20);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(0).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , core      = __webpack_require__(1)
  , hide      = __webpack_require__(7)
  , redefine  = __webpack_require__(36)
  , ctx       = __webpack_require__(24)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(33)
  , gOPS     = __webpack_require__(31)
  , pIE      = __webpack_require__(34)
  , toObject = __webpack_require__(41)
  , IObject  = __webpack_require__(8)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(21)
  , IE8_DOM_DEFINE = __webpack_require__(28)
  , toPrimitive    = __webpack_require__(42)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(6)
  , toIObject    = __webpack_require__(10)
  , arrayIndexOf = __webpack_require__(22)(false)
  , IE_PROTO     = __webpack_require__(37)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(32)
  , enumBugKeys = __webpack_require__(26);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , hide      = __webpack_require__(7)
  , has       = __webpack_require__(6)
  , SRC       = __webpack_require__(11)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(1).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(38)('keys')
  , uid    = __webpack_require__(11);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(9)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(9)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(5);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(27);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(29)});

/***/ }),
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map