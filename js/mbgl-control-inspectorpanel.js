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
    loadFeatures (featuregroups) {
        // console.log([ 'loadFeatures()', featuregroups ]);

        // empty the listing, without orphaning event handlers et al
        var range = document.createRange();
        range.selectNodeContents(this._listing);
        range.deleteContents();

        // got nothing? close the window and bail
        if (! featuregroups) {
            this.closePanel();
            return;
        }
        this.openPanel();

        // loop through feature groups; show their title, then a DIV full of their template results
        featuregroups.forEach((featuregroup) => {
            if (! featuregroup.features.length) return;  // no features = skip

            // add the featuregroup DIV and the title
            const thisgroup = document.createElement("DIV");
            thisgroup.className = 'mbgl-control-inspectorpanel-featuregroup';
            thisgroup.setAttribute('data-featuregroup', featuregroup.template);
            this._listing.appendChild(thisgroup);

            const thisgrouptitle = document.createElement("H2");
            thisgrouptitle.innerHTML = featuregroup.title;
            thisgroup.appendChild(thisgrouptitle);

            // add each feature in this group, generating its HTML from the layergroup's template setting vs the templates passed to our initial setup
            const htmlmaker = this.options.templates[featuregroup.template];
            if (! htmlmaker) throw new Error(`InspectorPanelControl featuregroup with unexpected template: ${sourceid}`);
            featuregroup.features.forEach((feature) => {
                // console.log(feature);

                const thisitem = document.createElement("DIV");
                thisitem.className = 'mbgl-control-inspectorpanel-feature';
                thisitem.innerHTML = htmlmaker(feature);

                thisgroup.appendChild(thisitem);
            });
        });
    }

    closePanel () {
        this._container.classList.add('mbgl-control-inspectorpanel-closed');
    }

    openPanel () {
        this._container.classList.remove('mbgl-control-inspectorpanel-closed');
    }
}
