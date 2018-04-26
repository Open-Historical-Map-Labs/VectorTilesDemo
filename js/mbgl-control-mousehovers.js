export class MapHoversControl {
    constructor (options={}) {
        // merge suppplied options with these defaults
        this.options = Object.assign({
            layers: {}, /// layerid => mouseevent callback
        }, options);
    }

    onAdd (map) {
        this._map = map;

        // when the map comes ready, attach the given events to the given layers
        this._map.on('load', () => {
            Object.entries(this.options.layers).forEach( ([layerid, callbacks]) => {
                if (callbacks.enter) {
                    this._map.on("mousemove", layerid, callbacks.enter);
                }
                if (callbacks.leave) {
                    this._map.on("mouseleave", layerid, callbacks.leave);
                }
            });
        });

        // return some dummy container we won't use
        this._container = document.createElement('span');
        return this._container;
    }

    onRemove () {
        // detach events
        Object.entries(this.options.layers).forEach( ([layerid, callbacks]) => {
            if (callbacks.enter) {
                this._map.off("mousemove", layerid, callbacks.enter);
            }
            if (callbacks.leave) {
                this._map.off("mouseleave", layerid, callbacks.leave);
            }
        });

        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}
