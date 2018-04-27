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
            play_years: 10,
            play_speed: 0.8,
        }, options);
    }

    onAdd (map) {
        this._map = map;

        this._busyplaying = undefined;

        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl mbgl-control-timeslider";
    
        // slider element, with min/max/value from options
        this._slider = document.createElement('input');
        this._slider.eitle = "Slide to select a year";
        this._slider.type = "range";
        this._slider.min = this.options.min;
        this._slider.max = this.options.max;
        this._slider.step = this.options.step;
        this._slider.value = this.options.year;
        this._container.appendChild(this._slider);

        this._slider.addEventListener('change', () => {
            this.updateOnChange();
        });

        // the selected-year readout
        this._readout = document.createElement('div');
        this._readout.className = 'mbgl-control-timeslider-readout';
        this._container.appendChild(this._readout);

        // the play/pause buttons
        this._buttonwrapper = document.createElement('div');
        this._buttonwrapper.className = 'mbgl-control-timeslider-buttons';
        this._container.appendChild(this._buttonwrapper);

        this._playbutton = document.createElement('button');
        this._stopbutton = document.createElement('button');
        this._nextbutton = document.createElement('button');
        this._prevbutton = document.createElement('button');

        this._playbutton.title = "Cycle through years automatically";
        this._stopbutton.title = "Stop";
        this._nextbutton.title = "Next Year";
        this._prevbutton.title = "Previous Year";

        this._playbutton.innerHTML = '<i class="glyphicons glyphicons-play-button"></i>';
        this._stopbutton.innerHTML = '<i class="glyphicons glyphicons-pause"></i>';
        this._nextbutton.innerHTML = '<i class="glyphicons glyphicons-chevron-right"></i>';
        this._prevbutton.innerHTML = '<i class="glyphicons glyphicons-chevron-left"></i>';

        this._playbutton.addEventListener('click', () => { this.clickPlay(); });
        this._stopbutton.addEventListener('click', () => { this.clickStop(); });
        this._nextbutton.addEventListener('click', () => { this.clickNext(); });
        this._prevbutton.addEventListener('click', () => { this.clickPrev(); });

        this._buttonwrapper.appendChild(this._prevbutton);
        this._buttonwrapper.appendChild(this._playbutton);
        this._buttonwrapper.appendChild(this._stopbutton);
        this._buttonwrapper.appendChild(this._nextbutton);

        // set up to apply our action when the map first loads
        this._map.on('load', () => {
            this.clickStop();
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

        this._readout.innerHTML = this._slider.value;

        var year      = this._slider.value;
        var startdate = parseInt(year) + '/12/31';
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

    clickPlay () {
        // toggle which button is visible
        this._playbutton.style.display = 'none';
        this._stopbutton.style.display = 'inline-block';

        // cycle to the next year right now, then set the timer to keep doing so
        this.clickNext();
        this._busyplaying = setInterval(() => {
            this.clickNext();
        }, 1000 * this.options.play_speed);
    }

    clickStop () {
        // toggle which button is visible
        this._playbutton.style.display = 'inline-block';
        this._stopbutton.style.display = 'none';

        // stop the timer, then clear its existence
        clearInterval(this._busyplaying);
        this._busyplaying = undefined;
    }

    clickNext () {
        // try to increment to the next year... or wrap around if that's past the end
        let newvalue = parseInt(this._slider.value) + this.options.play_years;
        if (newvalue > this._slider.max) {
            newvalue = this._slider.min;
        }
        this.selectYear(newvalue);
    }

    clickPrev () {
        // try to decrement to the prior year... or wrap around if that's past the start
        let newvalue = parseInt(this._slider.value) - this.options.play_years;
        if (newvalue < this._slider.min) {
            newvalue = this._slider.max;
        }
        this.selectYear(newvalue);
    }

}
