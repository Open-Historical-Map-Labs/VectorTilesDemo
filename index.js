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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

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
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(10)
  , defined = __webpack_require__(6);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(0)
  , hide      = __webpack_require__(9)
  , redefine  = __webpack_require__(42)
  , ctx       = __webpack_require__(32)
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
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(37)
  , createDesc = __webpack_require__(41);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(31);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(39)
  , enumBugKeys = __webpack_require__(34);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _maplayers = __webpack_require__(26);

var _mbglControlTimeslider = __webpack_require__(25);

var _mbglControlLayerpicker = __webpack_require__(22);

var _mbglControlMousehovers = __webpack_require__(24);

var _mbglControlMouseclicks = __webpack_require__(23);

var _mbglControlInspectorpanel = __webpack_require__(21);

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

    // for this demo, the Newberry data
    // 1629 is the Plymouth land grant, the first county/township
    // 1783 is the Treaty of Paris, where US states became legit (despite the US saying they were legit in 1776)
    MAP.TIMESLIDER = new _mbglControlTimeslider.TimeSliderControl({
        year: 1783,
        min: 1630,
        max: 2000,
        step: 1,
        play_years: 5,
        maplayerids: ['state-boundaries-historical', 'county-boundaries-historical']
    });
    MAP.addControl(MAP.TIMESLIDER);

    MAP.LAYERPICKER = new _mbglControlLayerpicker.LayerPickerControl();
    MAP.addControl(MAP.LAYERPICKER);

    MAP.INSPECTORPANEL = new _mbglControlInspectorpanel.InspectorPanelControl({
        templates: {
            'states-modern': function statesModern(feature) {
                return '' + feature.properties.STATE_NAME;
            },
            'counties-modern': function countiesModern(feature) {
                return feature.properties.NAME + ' County';
            },
            'states-historical': function statesHistorical(feature) {
                return '\n                    <b>' + feature.properties.NAME + ', ' + feature.properties.START + ' - ' + (feature.properties.END != '9999/12/31' ? feature.properties.END : 'Present') + '</b>\n                    <br/>\n                    <div class="small">' + feature.properties.CHANGE + ' ' + feature.properties.CITATION + '</div>\n                ';
            },
            'counties-historical': function countiesHistorical(feature) {
                return '\n                    <b>' + feature.properties.NAME + ', ' + feature.properties.START + ' - ' + (feature.properties.END != '9999/12/31' ? feature.properties.END : 'Present') + '</b>\n                    <br/>\n                    <div class="small">' + feature.properties.CHANGE + ' ' + feature.properties.CITATION + '</div>\n                ';
            }
        }
    });
    MAP.addControl(MAP.INSPECTORPANEL);

    MAP.HOVERS = new _mbglControlMousehovers.MapHoversControl({
        layers: {
            'state-boundaries-historical': {
                enter: function enter(mouseevent) {
                    // there's a highlight layer: same data as state boundaries, but alternative style to be shown in conjunction with the visible one
                    var featureid = mouseevent.features[0].properties.IDNUM;
                    var tooltip = mouseevent.features[0].properties.NAME;
                    MAP.setFilter('state-boundaries-historical-hover', ["==", "IDNUM", featureid]);
                    document.getElementById('map').title = tooltip;
                    MAP.getCanvas().style.cursor = 'crosshair';
                },
                leave: function leave(mouseevent) {
                    MAP.setFilter('state-boundaries-historical-hover', ["==", "IDNUM", -1]);
                    document.getElementById('map').title = "";
                    MAP.getCanvas().style.cursor = 'inherit';
                }
            },
            'county-boundaries-historical': {
                enter: function enter(mouseevent) {
                    // there's a highlight layer: same data as county boundaries, but alternative style to be shown in conjunction with the visible one
                    var featureid = mouseevent.features[0].properties.IDNUM;
                    var tooltip = mouseevent.features[0].properties.NAME;
                    MAP.setFilter('county-boundaries-historical-hover', ["==", "IDNUM", featureid]);
                    document.getElementById('map').title = tooltip;
                    MAP.getCanvas().style.cursor = 'crosshair';
                },
                leave: function leave(mouseevent) {
                    MAP.setFilter('county-boundaries-historical-hover', ["==", "IDNUM", -1]);
                    document.getElementById('map').title = "";
                    MAP.getCanvas().style.cursor = 'inherit';
                }
            }
        }
    });
    MAP.addControl(MAP.HOVERS);

    MAP.CLICKS = new _mbglControlMouseclicks.MapClicksControl({
        click: function click(clickevent) {
            // one layer at a time, compile the history of thisd point location
            // past state/territory status and modern state
            // past county/township status and modern county
            // the inspector panel expects a list of result sets, with a title and a list of results and a spec as to which layout template to use
            //
            // warning: a known "feature" of vector tile querying like this, is that it ONLY OPERATES ON WHAT'S VISIBLE IN THE VIEWPORT
            // e.g. no counties until you've zoomed in
            var collected_feature_groups = [{
                title: "Present Day",
                template: 'states-modern',
                features: MAP.queryRenderedFeatures(clickevent.point, { layers: ['states-modern-clickable'] })
            }, {
                title: "Present County/Township",
                template: 'counties-modern',
                features: MAP.queryRenderedFeatures(clickevent.point, { layers: ['counties-modern-clickable'] })
            }, {
                title: "Historical State/Territory",
                template: 'states-historical',
                features: MAP.queryRenderedFeatures(clickevent.point, { layers: ['states-historical-clickable'] })
            }, {
                title: "Historical County/Township",
                template: 'counties-historical',
                features: MAP.queryRenderedFeatures(clickevent.point, { layers: ['counties-historical-clickable'] })
            }];

            // unique-ify each set of features by its IDNUM; MBGL is documented to return duplicates when features span tiles
            // the modern datasets lack an IDNUM which is okay: there will only be one feature (if any), with a key of undefined, so we still end up with 1 feature afterward (if any)
            collected_feature_groups.forEach(function (featuregroup) {
                var uniques = {};
                featuregroup.features.forEach(function (feature) {
                    uniques[feature.properties.IDNUM] = feature;
                });
                featuregroup.features = Object.values(uniques);
            });
            collected_feature_groups.forEach(function (featuregroup) {
                switch (featuregroup.template) {
                    case 'counties-historical':
                    case 'states-historical':
                        featuregroup.features.sort(function (p, q) {
                            return p.properties.START < q.properties.START ? 1 : -1;
                        });
                        break;
                }
            });

            // ready; hand off
            MAP.INSPECTORPANEL.loadFeatures(collected_feature_groups);
        }
    });
    MAP.addControl(MAP.CLICKS);

    //  
    // startup and initial state, once the GL Map has loaded
    //
    MAP.on('load', function () {
        // nothing else to do here; controls all have their own map.load handlers to fire up their dynamic actions
        // this is where one would load a querystring/hash to set up initial state: filtering and layer visibility, etc.
    });
});

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
module.exports = __webpack_require__(0).Object.entries;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * A wrapper for generating "what's where you clicked" information, from a set of Feature objects fed into it
 * Pass to loadFeatures() a set of map Features (the type you'd get from a click or hover event) to display them in a listing.
 * The HTML generated for each feature, depends on its data source.
 * 
 * Params:
 * templates -- an object mapping a layer source name onto a callback, e.g. state-boundaries => function (feature) ...
 *              This effectively means that all layers from the same source, will get the same template function (after all, they have the same attributes)
 *              The function is passed the Feature, and should return HTML to be inserted into the listing.
 * 
 * Example:
 * panel = new InspectorPanelControl({
 *     templates: {
 *         'states': function (feature) {
 *         },
 *         'counties': function (feature) {
 *         },
 *     }
 * });
 * panel.loadFeatures([ ... ... ... ]);
 */

// WARNING: dependency on Glyphicons Pro for the icons

__webpack_require__(51);

var InspectorPanelControl = exports.InspectorPanelControl = function () {
    function InspectorPanelControl() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, InspectorPanelControl);

        // merge suppplied options with these defaults
        this.options = Object.assign({
            templates: {} // source-ID => function
        }, options);
    }

    _createClass(InspectorPanelControl, [{
        key: "onAdd",
        value: function onAdd(map) {
            this._map = map;

            this._container = document.createElement("DIV");
            this._container.className = "mapboxgl-ctrl mbgl-control-inspectorpanel mbgl-control-inspectorpanel-closed";

            this._closebutton = document.createElement("I");
            this._closebutton.className = 'mbgl-control-inspectorpanel-closebutton glyphicons glyphicons-remove-circle';
            this._container.appendChild(this._closebutton);

            this._listing = document.createElement("DIV");
            this._listing.className = 'mbgl-control-inspectorpanel-listing';
            this._container.appendChild(this._listing);

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
            return 'bottom-right';
        }

        // hand this control a set of new features to show their info
        // null or an empty list, will hide the panel

    }, {
        key: "loadFeatures",
        value: function loadFeatures(featuregroups) {
            var _this = this;

            // console.log([ 'loadFeatures()', featuregroups ]);

            // empty the listing, without orphaning event handlers et al
            var range = document.createRange();
            range.selectNodeContents(this._listing);
            range.deleteContents();

            // got nothing? close the window and bail
            if (!featuregroups) {
                this.closePanel();
                return;
            }
            this.openPanel();

            // loop through feature groups; show their title, then a DIV full of their template results
            featuregroups.forEach(function (featuregroup) {
                if (!featuregroup.features.length) return; // no features = skip

                // add the featuregroup DIV and the title
                var thisgroup = document.createElement("DIV");
                thisgroup.className = 'mbgl-control-inspectorpanel-featuregroup';
                thisgroup.setAttribute('data-featuregroup', featuregroup.template);
                _this._listing.appendChild(thisgroup);

                var thisgrouptitle = document.createElement("H2");
                thisgrouptitle.innerHTML = featuregroup.title;
                thisgroup.appendChild(thisgrouptitle);

                // add each feature in this group, generating its HTML from the layergroup's template setting vs the templates passed to our initial setup
                var htmlmaker = _this.options.templates[featuregroup.template];
                if (!htmlmaker) throw new Error("InspectorPanelControl featuregroup with unexpected template: " + sourceid);
                featuregroup.features.forEach(function (feature) {
                    // console.log(feature);

                    var thisitem = document.createElement("DIV");
                    thisitem.className = 'mbgl-control-inspectorpanel-feature';
                    thisitem.innerHTML = htmlmaker(feature);

                    thisgroup.appendChild(thisitem);
                });
            });
        }
    }, {
        key: "closePanel",
        value: function closePanel() {
            this._container.classList.add('mbgl-control-inspectorpanel-closed');
        }
    }, {
        key: "openPanel",
        value: function openPanel() {
            this._container.classList.remove('mbgl-control-inspectorpanel-closed');
        }
    }]);

    return InspectorPanelControl;
}();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(52);

var LAYER_GROUPS = [{
    'title': "Historical Boundaries",
    layers: [{
        'title': "States",
        'layerids': ['state-boundaries-historical'],
        'visible': true
    }, {
        'title': "Counties",
        'layerids': ['county-boundaries-historical'],
        'visible': false
    }]
}, {
    'title': "Modern Boundaries (2018)",
    layers: [{
        'title': "States",
        'layerids': ['state-boundaries-modern-line'],
        'visible': false
    }, {
        'title': "Counties",
        'layerids': ['county-boundaries-modern-line'],
        'visible': false
    }]
}];

var LayerPickerControl = exports.LayerPickerControl = function () {
    function LayerPickerControl() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, LayerPickerControl);

        // merge suppplied options with these defaults
        this.options = Object.assign({
            layergroups: LAYER_GROUPS
        }, options);
    }

    _createClass(LayerPickerControl, [{
        key: 'onAdd',
        value: function onAdd(map) {
            var _this = this;

            this._map = map;

            this._container = document.createElement("div");
            this._container.className = "mapboxgl-ctrl mbgl-control-layerpicker";

            // lay out the layer groups, which are a header/title and a list of labels-and-checkboxes per layer within the group
            LAYER_GROUPS.forEach(function (layergroup) {
                var section = document.createElement('div');
                section.className = 'layergroup';
                _this._container.appendChild(section);

                var bigtitle = document.createElement('h2');
                bigtitle.innerHTML = layergroup.title;
                section.appendChild(bigtitle);

                layergroup.layers.forEach(function (layer) {
                    var label = document.createElement('label');
                    label.innerHTML = layer.title;

                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox";
                    checkbox.checked = layer.visible;
                    checkbox.value = layer.layerids.join(',');
                    label.prepend(checkbox);

                    checkbox.addEventListener('change', function (event) {
                        var layerids = event.target.value.split(','); // checkboxes have a value= of the layer-IDs comma-joined
                        var visible = event.target.checked;
                        _this.toggleLayer(layerids, visible);
                    });

                    _this._map.on('load', function () {
                        // when the map comes ready, apply this checkbox's state as if it had just changed into its checked/unchecked state, so as to make the layers match the checkboxes
                        checkbox.dispatchEvent(new Event('change'));
                    });

                    section.appendChild(label);
                });
            });

            // done
            return this._container;
        }
    }, {
        key: 'onRemove',
        value: function onRemove() {
            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        }
    }, {
        key: 'getDefaultPosition',
        value: function getDefaultPosition() {
            return 'top-left';
        }
    }, {
        key: 'toggleLayer',
        value: function toggleLayer(layerids, visible) {
            var _this2 = this;

            var display = visible ? 'visible' : 'none';

            this._map.getStyle().layers.filter(function (maplayer) {
                return layerids.indexOf(maplayer.id) >= 0;
            }).forEach(function (maplayer) {
                _this2._map.setLayoutProperty(maplayer.id, 'visibility', display);
            });
        }
    }]);

    return LayerPickerControl;
}();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Map click control for MBGL
 *
 * Params:
 * layers -- an object mapping layer-ID onto a callback when a feature in that layer is clicked
 * Example:
 *     new MapClicksControl({
 *         layers: {
 *             'state-boundaries-historical': function (clickevent) {
 *             },
 *             'county-boundaries-historical': function (clickevent) {
 *             },
 *         }
 * OR
 * click -- a callback when the map is clicked
 *     new MapClicksControl({
 *         click: function (clickevent) {
 *         },
 *     });
 */

var MapClicksControl = exports.MapClicksControl = function () {
    function MapClicksControl() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, MapClicksControl);

        // merge suppplied options with these defaults
        this.options = Object.assign({
            layers: {} /// layerid => clickevent callback
        }, options);
    }

    _createClass(MapClicksControl, [{
        key: "onAdd",
        value: function onAdd(map) {
            var _this = this;

            this._map = map;

            // when the map comes ready, attach these events
            this._map.on('load', function () {
                if (_this.options.layers) {
                    Object.entries(_this.options.layers).forEach(function (_ref) {
                        var _ref2 = _slicedToArray(_ref, 2),
                            layerid = _ref2[0],
                            callback = _ref2[1];

                        _this._map.on("click", layerid, callback);
                    });
                }
                if (_this.options.click) {
                    _this._map.on("click", _this.options.click);
                }
            });

            // return some dummy container we won't use
            this._container = document.createElement('span');
            return this._container;
        }
    }, {
        key: "onRemove",
        value: function onRemove() {
            var _this2 = this;

            // detach the event handlers
            if (this.options.layers) {
                Object.entries(this.options.layers).forEach(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 2),
                        layerid = _ref4[0],
                        callback = _ref4[1];

                    _this2._map.off("click", layerid, callback);
                });
            }
            if (this.options.click) {
                this._map.off("click", this.options.click);
            }

            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        }
    }, {
        key: "onMouseClick",
        value: function onMouseClick(event) {
            console.log(['onMouseClick()', event]);
        }
    }]);

    return MapClicksControl;
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapHoversControl = exports.MapHoversControl = function () {
    function MapHoversControl() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, MapHoversControl);

        // merge suppplied options with these defaults
        this.options = Object.assign({
            layers: {} /// layerid => mouseevent callback
        }, options);
    }

    _createClass(MapHoversControl, [{
        key: "onAdd",
        value: function onAdd(map) {
            var _this = this;

            this._map = map;

            // when the map comes ready, attach the given events to the given layers
            this._map.on('load', function () {
                Object.entries(_this.options.layers).forEach(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                        layerid = _ref2[0],
                        callbacks = _ref2[1];

                    if (callbacks.enter) {
                        _this._map.on("mousemove", layerid, callbacks.enter);
                    }
                    if (callbacks.leave) {
                        _this._map.on("mouseleave", layerid, callbacks.leave);
                    }
                });
            });

            // return some dummy container we won't use
            this._container = document.createElement('span');
            return this._container;
        }
    }, {
        key: "onRemove",
        value: function onRemove() {
            var _this2 = this;

            // detach events
            Object.entries(this.options.layers).forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    layerid = _ref4[0],
                    callbacks = _ref4[1];

                if (callbacks.enter) {
                    _this2._map.off("mousemove", layerid, callbacks.enter);
                }
                if (callbacks.leave) {
                    _this2._map.off("mouseleave", layerid, callbacks.leave);
                }
            });

            this._container.parentNode.removeChild(this._container);
            this._map = undefined;
        }
    }]);

    return MapHoversControl;
}();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// WARNING: dependency on Glyphicons Pro for the icons

__webpack_require__(53);

var TimeSliderControl = exports.TimeSliderControl = function () {
    function TimeSliderControl() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, TimeSliderControl);

        // merge suppplied options with these defaults
        this.options = Object.assign({
            year: 1950,
            min: 1900,
            max: 2000,
            step: 10,
            maplayerids: [],
            play_years: 10,
            play_speed: 0.8
        }, options);
    }

    _createClass(TimeSliderControl, [{
        key: "onAdd",
        value: function onAdd(map) {
            var _this = this;

            this._map = map;

            this._busyplaying = undefined;

            this._container = document.createElement("div");
            this._container.className = "mapboxgl-ctrl mbgl-control-timeslider";

            // slider element, with min/max/value from options
            this._slider = document.createElement('input');
            this._slider.eitle = "Slide to select a year";
            this._slider.type = "range";
            this._slider.min = this.options.min;
            this._slider.max = this.options.max;
            this._slider.step = this.options.step;
            this._slider.value = this.options.year;
            this._container.appendChild(this._slider);

            this._slider.addEventListener('change', function () {
                _this.updateOnChange();
            });

            // the selected-year readout
            this._readout = document.createElement('div');
            this._readout.className = 'mbgl-control-timeslider-readout';
            this._container.appendChild(this._readout);

            // the play/pause buttons
            this._buttonwrapper = document.createElement('div');
            this._buttonwrapper.className = 'mbgl-control-timeslider-buttons';
            this._container.appendChild(this._buttonwrapper);

            this._playbutton = document.createElement('button');
            this._stopbutton = document.createElement('button');
            this._nextbutton = document.createElement('button');
            this._prevbutton = document.createElement('button');

            this._playbutton.title = "Cycle through years automatically";
            this._stopbutton.title = "Stop";
            this._nextbutton.title = "Next Year";
            this._prevbutton.title = "Previous Year";

            this._playbutton.innerHTML = '<i class="glyphicons glyphicons-play-button"></i>';
            this._stopbutton.innerHTML = '<i class="glyphicons glyphicons-pause"></i>';
            this._nextbutton.innerHTML = '<i class="glyphicons glyphicons-chevron-right"></i>';
            this._prevbutton.innerHTML = '<i class="glyphicons glyphicons-chevron-left"></i>';

            this._playbutton.addEventListener('click', function () {
                _this.clickPlay();
            });
            this._stopbutton.addEventListener('click', function () {
                _this.clickStop();
            });
            this._nextbutton.addEventListener('click', function () {
                _this.clickNext();
            });
            this._prevbutton.addEventListener('click', function () {
                _this.clickPrev();
            });

            this._buttonwrapper.appendChild(this._prevbutton);
            this._buttonwrapper.appendChild(this._playbutton);
            this._buttonwrapper.appendChild(this._stopbutton);
            this._buttonwrapper.appendChild(this._nextbutton);

            // set up to apply our action when the map first loads
            this._map.on('load', function () {
                _this.clickStop();
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

            this._readout.innerHTML = this._slider.value;

            var year = this._slider.value;
            var startdate = parseInt(year) + '/12/31';
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
    }, {
        key: "clickPlay",
        value: function clickPlay() {
            var _this3 = this;

            // toggle which button is visible
            this._playbutton.style.display = 'none';
            this._stopbutton.style.display = 'inline-block';

            // cycle to the next year right now, then set the timer to keep doing so
            this.clickNext();
            this._busyplaying = setInterval(function () {
                _this3.clickNext();
            }, 1000 * this.options.play_speed);
        }
    }, {
        key: "clickStop",
        value: function clickStop() {
            // toggle which button is visible
            this._playbutton.style.display = 'inline-block';
            this._stopbutton.style.display = 'none';

            // stop the timer, then clear its existence
            clearInterval(this._busyplaying);
            this._busyplaying = undefined;
        }
    }, {
        key: "clickNext",
        value: function clickNext() {
            // try to increment to the next year... or wrap around if that's past the end
            var newvalue = parseInt(this._slider.value) + this.options.play_years;
            if (newvalue > this._slider.max) {
                newvalue = this._slider.min;
            }
            this.selectYear(newvalue);
        }
    }, {
        key: "clickPrev",
        value: function clickPrev() {
            // try to decrement to the prior year... or wrap around if that's past the start
            var newvalue = parseInt(this._slider.value) - this.options.play_years;
            if (newvalue < this._slider.min) {
                newvalue = this._slider.max;
            }
            this.selectYear(newvalue);
        }
    }]);

    return TimeSliderControl;
}();

/***/ }),
/* 26 */
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
 * and it's the LayerPickerControl which will change the visibility of these layers (that's why they're all "none" right now)
 */

var VECTILES_BASE_URL = exports.VECTILES_BASE_URL = "https://ohm-demo.s3.amazonaws.com/tiles/";

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
  "layers": [
  /*
   * BASEMAP OPTIONS
   */
  {
    "id": "basemap-light",
    "type": "raster",
    "source": "basemap-light"
  },

  /*
   * HISTORICAL BOUNDARIES, the real meat of the matter
   * these are likely to be broken up to form color-classifications
   */
  {
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
      "visibility": "none"
    },
    "filter": ['all', ["<=", "START", "9999/12/31"], [">", "END", "9999/12/31"]] // filter: start date and end date clauses, drop in a year to see what had any presence during that year
  },

  /*
   * MODERN BOUNDARIES, for reference
   */
  {
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
      "visibility": "none"
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
      "visibility": "none"
    }
  },

  /*
   * HOVER EFFECTS, same state/county shapes as above, but lighter color... and with a filter to match nothing until mouse movement changes the filter
   */
  {
    "id": "county-boundaries-historical-hover",
    "source": "counties-historical",
    "source-layer": "counties",
    "type": "fill",
    "minzoom": COUNTIES_MIN_ZOOM,
    "paint": {
      "fill-color": "white",
      "fill-opacity": 0.5
    },
    "layout": {
      "visibility": "visible"
    },
    "filter": ["==", "IDNUM", -1] // for highlighting by this unique feature ID
  }, {
    "id": "state-boundaries-historical-hover",
    "source": "states-historical",
    "source-layer": "states",
    "type": "fill",
    "minzoom": STATES_MIN_ZOOM,
    "paint": {
      "fill-color": "white",
      "fill-opacity": 0.5
    },
    "layout": {
      "visibility": "visible"
    },
    "filter": ["==", "IDNUM", -1] // for highlighting by this unique feature ID
  },

  /*
   * CLICKABLES; the historical and modern boundaries data
   * no filters, unclassified and with transparent fill
   * so the map can be clicked to get info about everything in one go
   */
  {
    "id": "counties-modern-clickable",
    "source": "counties-modern",
    "source-layer": "counties",
    "type": "fill",
    "minzoom": COUNTIES_MIN_ZOOM,
    "paint": {
      "fill-color": "transparent"
    },
    "layout": {
      "visibility": "visible"
    }
  }, {
    "id": "states-modern-clickable",
    "source": "states-modern",
    "source-layer": "states",
    "type": "fill",
    "minzoom": STATES_MIN_ZOOM,
    "paint": {
      "fill-color": "transparent"
    },
    "layout": {
      "visibility": "visible"
    }
  }, {
    "id": "counties-historical-clickable",
    "source": "counties-historical",
    "source-layer": "counties",
    "type": "fill",
    "minzoom": COUNTIES_MIN_ZOOM,
    "paint": {
      "fill-color": "transparent"
    },
    "layout": {
      "visibility": "visible"
    }
  }, {
    "id": "states-historical-clickable",
    "source": "states-historical",
    "source-layer": "states",
    "type": "fill",
    "minzoom": STATES_MIN_ZOOM,
    "paint": {
      "fill-color": "transparent"
    },
    "layout": {
      "visibility": "visible"
    }
  }]
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// webpack entry point
// list JS files to include, CSS and SASS files to include, HTML templates to have [hash] replacement, etc.

__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(16);

__webpack_require__(20);
__webpack_require__(15);
__webpack_require__(19);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(5)
  , toLength  = __webpack_require__(46)
  , toIndex   = __webpack_require__(45);
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
/* 31 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(28);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(11)
  , gOPS     = __webpack_require__(38)
  , pIE      = __webpack_require__(12)
  , toObject = __webpack_require__(47)
  , IObject  = __webpack_require__(10)
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(29)
  , IE8_DOM_DEFINE = __webpack_require__(35)
  , toPrimitive    = __webpack_require__(48)
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
/* 38 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(8)
  , toIObject    = __webpack_require__(5)
  , arrayIndexOf = __webpack_require__(30)(false)
  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(11)
  , toIObject = __webpack_require__(5)
  , isEnum    = __webpack_require__(12).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , hide      = __webpack_require__(9)
  , has       = __webpack_require__(8)
  , SRC       = __webpack_require__(14)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(0).inspectSource = function(it){
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys')
  , uid    = __webpack_require__(14);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(13)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(6);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 48 */
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(7);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(36)});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(7)
  , $entries = __webpack_require__(40)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 52 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 53 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map