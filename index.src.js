import { STATES_MIN_ZOOM, COUNTIES_MIN_ZOOM } from './maplayers';
import { GLMAP_STYLE } from './maplayers';

import { TimeSliderControl } from './js/mbgl-control-timeslider';
import { LayerPickerControl } from './js/mbgl-control-layerpicker';
import { MapHoversControl } from './js/mbgl-control-mousehovers';
import { MapClicksControl } from './js/mbgl-control-mouseclicks';
import { InspectorPanelControl } from './js/mbgl-control-inspectorpanel';

const MIN_ZOOM = 3;
const MAX_ZOOM = 10;
const START_ZOOM = 3;
const START_CENTER = [-99.5, 37.9];

window.MAP = undefined;

$(document).ready(function () {
    //
    // basic map
    //
    MAP = new mapboxgl.Map({
        container: "map",
        style: GLMAP_STYLE,
        zoom: START_ZOOM,
        center: START_CENTER,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
    });

    MAP.addControl(new mapboxgl.NavigationControl());

    MAP.TIMESLIDER = new TimeSliderControl({
        year: 1790,
        min: 1790,
        max: 2000,
        step: 1,
        play_years: 5,
        maplayerids: [ 'state-boundaries-historical', 'county-boundaries-historical' ],
    });
    MAP.addControl(MAP.TIMESLIDER);

    MAP.LAYERPICKER = new LayerPickerControl();
    MAP.addControl(MAP.LAYERPICKER);

    MAP.INSPECTORPANEL = new InspectorPanelControl({
        templates: {
            'states-historical': function (feature) {
                return `
                    State: ${feature.properties.NAME}<br/>
                    Dates: ${feature.properties.START} - ${feature.properties.END != '9999/12/31' ? feature.properties.END : 'Present'}
                    <div>${feature.properties.CHANGE} ${feature.properties.CITATION}</div>
                `;
            },
            'counties-historical': function (feature) {
                return `
                    County: ${feature.properties.NAME}<br/>
                    Dates: ${feature.properties.START} - ${feature.properties.END != '9999/12/31' ? feature.properties.END : 'Present'}
                    <div>${feature.properties.CHANGE} ${feature.properties.CITATION}</div>
                `;
            },
        }
    });
    MAP.addControl(MAP.INSPECTORPANEL);

    MAP.HOVERS = new MapHoversControl({
        layers: {
            'state-boundaries-historical': {
                enter: function (mouseevent) {
                    // there's a highlight layer: same data as state boundaries, but alternative style to be shown in conjunction with the visible one
                    const featureid = mouseevent.features[0].properties.IDNUM;
                    const tooltip = mouseevent.features[0].properties.NAME;
                    MAP.setFilter('state-boundaries-historical-hover', [ "==", "IDNUM", featureid ]);
                    document.getElementById('map').title = tooltip;
                    MAP.getCanvas().style.cursor = 'crosshair';
                },
                leave: function (mouseevent) {
                    MAP.setFilter('state-boundaries-historical-hover', [ "==", "IDNUM", -1 ]);
                    document.getElementById('map').title = "";
                    MAP.getCanvas().style.cursor = 'inherit';
                },
            },
            'county-boundaries-historical': {
                enter: function (mouseevent) {
                    // there's a highlight layer: same data as county boundaries, but alternative style to be shown in conjunction with the visible one
                    const featureid = mouseevent.features[0].properties.IDNUM;
                    const tooltip = mouseevent.features[0].properties.NAME;
                    MAP.setFilter('county-boundaries-historical-hover', [ "==", "IDNUM", featureid ]);
                    document.getElementById('map').title = tooltip;
                    MAP.getCanvas().style.cursor = 'crosshair';
                },
                leave: function (mouseevent) {
                    MAP.setFilter('county-boundaries-historical-hover', [ "==", "IDNUM", -1 ]);
                    document.getElementById('map').title = "";
                    MAP.getCanvas().style.cursor = 'inherit';
                },
            },
        }
    });
    MAP.addControl(MAP.HOVERS);

    MAP.CLICKS = new MapClicksControl({
        click: function (clickevent) {
            // this version queries a box around the click, which is overkill for our use case of all polygons
            // but some day we'll add points and lines, then increasing pxbuffer to 3 will make it easier to click those
            const clicklayers   = [ 'state-boundaries-historical', 'county-boundaries-historical' ];
            const pxbuffer      = 1;
            const canvas        = MAP.getCanvasContainer();
            const rect          = canvas.getBoundingClientRect();
            const glpoint       = new mapboxgl.Point(clickevent.originalEvent.clientX - rect.left - canvas.clientLeft, clickevent.originalEvent.clientY - rect.top - canvas.clientTop);
            const pixelbox      = [ [glpoint.x - pxbuffer, glpoint.y - pxbuffer], [glpoint.x + pxbuffer, glpoint.y + pxbuffer] ];
            const features      = MAP.queryRenderedFeatures(pixelbox, { layers: clicklayers });

            // unique-ify the features; MBGL is documented to return duplicates when features span tiles
            const uniques = {};
            features.forEach((feature) => {
                uniques[feature.properties.IDNUM] = feature;
            });
            const showfeatures = Object.values(uniques);

            // ready; hand off
            MAP.INSPECTORPANEL.loadFeatures(showfeatures);
        },
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
