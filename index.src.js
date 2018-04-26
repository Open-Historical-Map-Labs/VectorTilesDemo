import { STATES_MIN_ZOOM, COUNTIES_MIN_ZOOM } from './maplayers';
import { GLMAP_STYLE } from './maplayers';

import { TimeSliderControl } from './js/mbgl-control-timeslider';
import { LayerPickerControl } from './js/mbgl-control-layerpicker';

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
            const tooltip_layer_ids = [ 'state-boundaries-historical', 'county-boundaries-historical' ];
            const pxbuffer = 3;
            const canvas   = MAP.getCanvasContainer();
            const rect     = canvas.getBoundingClientRect();
            const glpoint  = new mapboxgl.Point(event.originalEvent.clientX - rect.left - canvas.clientLeft, event.originalEvent.clientY - rect.top - canvas.clientTop);
            const pixelbox = [ [glpoint.x - pxbuffer, glpoint.y - pxbuffer], [glpoint.x + pxbuffer, glpoint.y + pxbuffer] ];
            const features = MAP.queryRenderedFeatures(pixelbox, { layers: tooltip_layer_ids });

            if (features.length) {
                // open a popup
                const attribs = features[0].properties;
                // console.log(attribs);

                const description = `
                    <h1>${attribs.NAME}</h1>
                    <p>${attribs.START} to ${attribs.END}</p>
                    <p>${attribs.CHANGE}</p>
                `;
                MAP.POPUP.setLngLat(event.lngLat).setHTML(description).addTo(MAP);
            }
            else {
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
