require('./mbgl-control-layerpicker.scss');

const LAYER_GROUPS = [
    {
        'title': "Historical Boundaries",
        layers: [
            {
                'title': "States",
                'layerids': [ 'state-boundaries-historical' ],
                'visible': true,
            },
            {
                'title': "Counties",
                'layerids': [ 'county-boundaries-historical' ],
                'visible': false,
            },
        ],
    },
    {
        'title': "Modern Boundaries (2018)",
        layers: [
            {
                'title': "States",
                'layerids': [ 'state-boundaries-modern-line' ],
                'visible': false,
            },
            {
                'title': "Counties",
                'layerids': [ 'county-boundaries-modern-line' ],
                'visible': true,
            },
        ],
    },
];

export class LayerPickerControl {
    constructor (options={}) {
        // merge suppplied options with these defaults
        this.options = Object.assign({
            layergroups: LAYER_GROUPS,
        }, options);
    }

    onAdd (map) {
        this._map = map;

        this._container = document.createElement("div");
        this._container.className = "mapboxgl-ctrl mbgl-control-layerpicker";

        // lay out the layer groups, which are a header/title and a list of labels-and-checkboxes per layer within the group
        LAYER_GROUPS.forEach((layergroup) => {
            const section = document.createElement('div');
            section.className = 'layergroup';
            this._container.appendChild(section);

            const bigtitle = document.createElement('h2');
            bigtitle.innerHTML = layergroup.title;
            section.appendChild(bigtitle);

            layergroup.layers.forEach((layer) => {
                const label = document.createElement('label');
                label.innerHTML = layer.title;

                const checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.checked = layer.visible;
                checkbox.value = layer.layerids.join(',');
                label.prepend(checkbox);

                checkbox.addEventListener('change', (event) => {
                    const layerids = event.target.value.split(',');  // checkboxes have a value= of the layer-IDs comma-joined
                    const visible = event.target.checked;
                    this.toggleLayer(layerids, visible);
                });

                this._map.on('load', () => {  // when the map comes ready, apply this checkbox's state as if it had just changed into its checked/unchecked state, so as to make the layers match the checkboxes
                    checkbox.dispatchEvent( new Event('change') );
                });

                section.appendChild(label);
            });
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

    toggleLayer (layerids, visible) {
        var display = visible ? 'visible' : 'none';

        this._map.getStyle().layers
        .filter((maplayer) => {
            return layerids.indexOf(maplayer.id) >= 0;
        })
        .forEach((maplayer) => {
            this._map.setLayoutProperty(maplayer.id, 'visibility', display);
        });
    }
}
