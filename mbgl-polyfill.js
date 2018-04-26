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
        }
        else {
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
