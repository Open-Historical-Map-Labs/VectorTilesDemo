require('./mbgl-control-timeslider.scss');

export class TimeSliderControl {
    constructor (options={}) {
        // merge suppplied options with these defaults
        this.options = Object.assign({
            year: 1950,
            min: 1900,
            max: 2000,
            step: 10,
            maplayerids: [],
        }, options);
    }

    onAdd (map) {
        this._map = map;

        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl mbgl-control-timeslider";
    
        // slider element, with min/max/value from options
        this._slider = document.createElement('input');
        this._slider.type = "range";
        this._slider.min = this.options.min;
        this._slider.max = this.options.max;
        this._slider.step = this.options.step;
        this._slider.value = this.options.year;
        this._container.appendChild(this._slider);

        this._slider.addEventListener('change', () => {
            this.updateOnChange();
        });

        // apply our action when the map first loads
        this._map.on('load', () => {
            this.updateOnChange();
        });

        // done
        return this._container;
    }

    onRemove () {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }

    getDefaultPosition () {
        return 'top-left';
    }

    selectYear (year) {
        this._slider.value = year;
        this.updateOnChange();
    }

    updateOnChange () {
        // console.log([ 'updateOnChange()', this._slider.value ]);

        var year      = this._slider.value;
        var startdate = parseInt(year) + '/01/01';
        var enddate   = parseInt(year) + '/12/31';
        var layerids  = this.options.maplayerids;

        var layers = this._map.getStyle().layers.filter((maplayer) => {
            return layerids.indexOf(maplayer.id) >= 0;
        });
        layers.forEach((maplayer) => {
            // filters are defined in maplayers.js and are known to be: all, START filter, END filter
            // plug in the year with /01/01 and /12/31 to form a date range
            // then apply it (workaround for bug, that one must null it first, here in this app only, today)
            var newfilters = maplayer.filter.slice();
            newfilters[1][2] = startdate;
            newfilters[2][2] = enddate;
            this._map.setFilter(maplayer.id, null);
            this._map.setFilter(maplayer.id, [ 'all', ['<=', 'START', startdate], ['>', 'END', enddate] ]);
        });
    }
}