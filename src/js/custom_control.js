class LayerControl {
  constructor(layers) {
    this.layers = layers;
  }

  onAdd(map) {
    this._map = map;
    
    // Create main container with MapLibre control classes
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group layer-ctrl-container';
    this._container.style.padding = '8px';
    this._container.style.fontSize = '12px';
    this._container.style.fontFamily = 'sans-serif';
    this._container.style.backgroundColor = '#fff';
    
    const layers_icon_img = document.createElement('img')
    layers_icon_img.setAttribute("src","./src/img/layers.png")
    layers_icon_img.style.display = 'block';
    const listContainer = document.createElement('div');
    listContainer.style.display = 'none';

    this._container.addEventListener('mouseenter', () => {
      this._container.style.width = 'auto';
      this._container.style.height = 'auto';
      this._container.style.cursor = 'default';
      listContainer.style.display = 'block';
      layers_icon_img.style.display = 'none';
    });

    this._container.addEventListener('mouseleave', () => {
      this._container.style.width = '26px';
      this._container.style.height = '26px';
      this._container.style.cursor = 'pointer';
      listContainer.style.display = 'none';
      layers_icon_img.style.display = 'block';
    });

    // Set initial visibility on map load
    this._map.on('load', () => {
      this.layers.forEach(layer => {
        if (this._map.getLayer(layer.id)) {
          const visibility = layer.visible ? 'visible' : 'none';
          this._map.setLayoutProperty(layer.id, 'visibility', visibility);
        }
      });
    });

    // Build the checkbox list
    this.layer_state = {}; //id: 0(checked=false),1(checked),2(checked, indeterminate)
    this.layers.forEach(layer => {
      const item = document.createElement('div');
      item.style.marginBottom = '4px';
      item.style.display = 'flex';
      item.style.alignItems = 'center';

      const label = document.createElement('label');
      label.htmlFor = `cbx-${layer.id}`;
      label.textContent = layer.name;
      label.style.cursor = 'pointer';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `cbx-${layer.id}`;
      checkbox.checked = layer.visible;
      this.layer_state[layer.id] = layer.visible ? 1 : 0; 
      checkbox.style.marginRight = '6px';
      checkbox.style.cursor = 'pointer';
      checkbox.indeterminate = false;

  
      // Toggle logic on click
      // checkbox.addEventListener('change', (e) => {
      //   if (this._map.getLayer(layer.id)) {
      //     const visibility = e.target.checked ? 'visible' : 'none';
      //     const lyr_opacity = e.target.indeterminate ? 0.75 : 1
      //     this._map.setLayoutProperty(layer.id, 'visibility', visibility);
      //     this._map.setLayoutProperty(layer.id, 'fill-layer-opacity', lyr_opacity);
          
      //   } else {
      //     console.warn(`Layer "${layer.id}" not found on the map style yet.`);
      //   }
      // });
      checkbox.addEventListener('click', (e) => {
        // e.preventDefault();
        let lyr_current_state = this.layer_state[layer.id];
        lyr_current_state = (lyr_current_state + 1) % 3;
        // console.log(lyr_current_state)
        this.layer_state[layer.id] = lyr_current_state;
        if (lyr_current_state === 0) {
          e.target.checked = false;
          e.target.indeterminate = false;
        } else if (lyr_current_state === 1) {
          e.target.checked = true;
          e.target.indeterminate = false;
        } else if (lyr_current_state === 2) {
          e.target.checked = false;
          e.target.indeterminate = true;
        }
      
        const visibility = (lyr_current_state === 1 || lyr_current_state === 2) ? 'visible' : 'none';
        const lyr_opacity = (lyr_current_state === 2) ? 0.6 : 1;
        // const opacityProperty = `${layer.type}-opacity`; 
        this._map.setLayoutProperty(layer.id, 'visibility', visibility);
        try {
          this._map.setPaintProperty(layer.id, 'raster-opacity', lyr_opacity);
        } catch (err) {
          try {
            this._map.setPaintProperty(layer.id, 'fill-opacity', lyr_opacity);
          } catch (err2) {
            // console.log(err,err2)
          }
        }
      });

      item.appendChild(checkbox);
      item.appendChild(label);
      listContainer.appendChild(item);
    });
    this._container.appendChild(layers_icon_img);
    this._container.appendChild(listContainer);


    return this._container;
  }

  onRemove() {
    this._container.remove();
    this._map = undefined;
  }
}

class ProfileControl {
  // constructor(layers) {
  //   this.layers = layers;
  // }

  onAdd(map) {
    this._map = map;
    
    // Create main container with MapLibre control classes
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group layer-ctrl-container';
    this._container.style.padding = '8px';
    this.profile_active = false
    const profile_icon_img = document.createElement('img')
    profile_icon_img.setAttribute("src","./src/img/profile_activate.png")
    profile_icon_img.style.display = 'block';
    const listContainer = document.createElement('div');
    listContainer.style.display = 'none';

    this._container.addEventListener('click', () => {
      console.log(document.profile_tool_active)
      if (document.profile_tool_active){
        document.profile_tool_active = false;
        this._map.getCanvas().style.cursor = '';
        profile_icon_img.setAttribute("src","./src/img/profile_activate.png")
        const profile_container = document.getElementById("profile_container")
        profile_container.style.display = "none";
      }
      else{
        document.profile_tool_active = true;
        this._map.getCanvas().style.cursor = 'crosshair';
        profile_icon_img.setAttribute("src","./src/img/profile_deactivate.png")
        const profile_container = document.getElementById("profile_container")
        profile_container.style.display = "block";

      }
    });

    this._container.appendChild(profile_icon_img);

    return this._container;
  }

  onRemove() {
    this._container.remove();
    this._map = undefined;
  }
}