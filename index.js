var MAP;

var MIN_ZOOM = 3;
var MAX_ZOOM = 10;
var START_ZOOM = 3;
var START_CENTER = [-99.5, 37.9];

function init() {
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

    //
    // mouse-hover for an informational popup
    // the mousemove handler is set up after the load has fired, to avoid annoying consol eerrors when the mouse is moved while it's still loading
    //
    MAP.POPUP = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    MAP.on('load', function () {
        MAP.on('mousemove', function (event) {
            var tooltip_layer_ids = [ 'state-boundaries-historical', 'county-boundaries-historical' ];
            var pxbuffer = 1;
            var canvas   = MAP.getCanvasContainer();
            var rect     = canvas.getBoundingClientRect();
            var glpoint  = new mapboxgl.Point(event.originalEvent.clientX - rect.left - canvas.clientLeft, event.originalEvent.clientY - rect.top - canvas.clientTop);
            var pixelbox = [ [glpoint.x - pxbuffer, glpoint.y - pxbuffer], [glpoint.x + pxbuffer, glpoint.y + pxbuffer] ];
            var features = MAP.queryRenderedFeatures(pixelbox, { layers: tooltip_layer_ids });

            if (features.length) {
                // open a popup
                var attribs = features[0].properties;
                console.log(attribs);

                var description = "";
                description += '<h1>' + attribs.NAME + '</h1>';
                description += '<p>' + attribs.START + ' to ' + attribs.END + '</p>';
                description += '<p>' + attribs.CHANGE + '</p>';
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
    });
}
