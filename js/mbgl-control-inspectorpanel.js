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


require('./mbgl-control-inspectorpanel.scss');

export class InspectorPanelControl {
    constructor (options={}) {
        // merge suppplied options with these defaults
        this.options = Object.assign({
            templates: {},  // source-ID => function
        }, options);
    }

    onAdd (map) {
        this._map = map;

        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl mbgl-control-inspectorpanel mbgl-control-inspectorpanel-closed";

        const bigtitle = document.createElement("h2");
        bigtitle.innerHTML = "What's Here?";
        this._container.appendChild(bigtitle);

        this._listing = document.createElement("DIV");
        this._listing.className = 'mbgl-control-inspectorpanel-listing';
        this._container.appendChild(this._listing);

        // done
        return this._container;
    }

    onRemove () {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    getDefaultPosition () {
        return 'bottom-right';
    }

    // hand this control a set of new features to show their info
    // null or an empty list, will hide the panel
    loadFeatures (features) {
        //console.log([ 'loadFeatures()', features ]);

        // empty the listing, without orphaning event handlers et al
        var range = document.createRange();
        range.selectNodeContents(this._listing);
        range.deleteContents();

        // got nothing?: close the window and bail
        if (! features || ! features.length) {
            this._container.classList.add('mbgl-control-inspectorpanel-closed');
            return;
        }

        // guess we're showing stuff
        this._container.classList.remove('mbgl-control-inspectorpanel-closed');
        features.forEach((feature) => {
            const thisitem = document.createElement("DIV");
            thisitem.className = 'mbgl-control-inspectorpanel-item';
            // console.log(feature);

            const sourceid = feature.layer.source;
            const htmlmaker = this.options.templates[sourceid];
            if (! htmlmaker) throw new Error(`InspectorPanelControl for a feature with an unexpected source: ${sourceid}`);
            thisitem.innerHTML = htmlmaker(feature);

            this._listing.appendChild(thisitem);
        });
    }
}
