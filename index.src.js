import { STATES_MIN_ZOOM, COUNTIES_MIN_ZOOM } from './maplayers';
import { GLMAP_STYLE } from './maplayers';

import { TimeSliderControl } from './js/mbgl-control-timeslider';
import { LayerPickerControl } from './js/mbgl-control-layerpicker';
import { MapHoversControl } from './js/mbgl-control-mousehovers';
import { MapClicksControl } from './js/mbgl-control-mouseclicks';

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
        step: 10,
        maplayerids: [ 'state-boundaries-historical', 'county-boundaries-historical' ],
    });
    MAP.addControl(MAP.TIMESLIDER);

    MAP.LAYERPICKER = new LayerPickerControl();
    MAP.addControl(MAP.LAYERPICKER);

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
        layers: {
            'state-boundaries-historical': function (clickevent) {
                const featureid = clickevent.features[0].properties.IDNUM;
                populateInfoPanel('state-boundaries-historical', featureid);
            },
            'county-boundaries-historical': function (clickevent) {
                const featureid = clickevent.features[0].properties.IDNUM;
                populateInfoPanel('state-boundaries-historical', featureid);
            },
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

function populateInfoPanel(layerid, featureid) {
    console.log([ 'populateInfoPanel()', layerid, featureid ]);
}
