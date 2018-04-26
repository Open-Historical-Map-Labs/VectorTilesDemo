export class MapClicksControl {
    constructor (options={}) {
        // merge suppplied options with these defaults
        this.options = Object.assign({
            layers: {}, /// layerid => clickevent callback
        }, options);
    }

    onAdd (map) {
        this._map = map;

        // when the map comes ready, attach these events
        this._map.on('load', () => {
            Object.entries(this.options.layers).forEach( ([layerid, callback]) => {
                this._map.on("click", layerid, callback);
            });
        });

        // return some dummy container we won't use
        this._container = document.createElement('span');
        return this._container;
    }

    onRemove () {
        // when the map comes ready, attach the given events to the given layers
        Object.entries(this.options.layers).forEach( ([layerid, callback]) => {
            this._map.off("click", layerid, callback);
        });

        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    onMouseClick (event) {
        console.log([ 'onMouseClick()', event ]);
    }
}
