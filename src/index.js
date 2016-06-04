'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import MapboxMap from 'react-mapboxmap';
import style from './index.css';

class Map extends React.Component {
  render() {
    return (
            <div className={style.map}>
                <MapboxMap
                    mapId="mapbox.comic"
                    zoomControl={false}
                    center={[59.907433, 30.299848]}
                    zoom={17}
                    onMapCreated={this._onMapCreated}/>
            </div>);
  }
  _onMapCreated(map, L) {
    let heat = L.heatLayer([], {
      maxZoom: 10,
      blur: 50
    });
    let clusterGroup = new L.MarkerClusterGroup();
    let featureLayer = L.mapbox
            .featureLayer()
            .loadURL('./data/geojson/full/places.geojson');
    let added = [];
    featureLayer.on('ready', () => {
      map.fitBounds(featureLayer.getBounds());
      featureLayer.eachLayer(l => {
        if (l.feature.properties.place.name) {
          l.bindPopup(l.feature.properties.place.name, {closeButton: false});
        }
        heat.addLatLng(l.getLatLng());
        if (added.indexOf(l.feature.properties.place.id) === -1) {
          added.push(l.feature.properties.place.id);
          clusterGroup.addLayer(l);
        }
      });
      console.log(added.length);
      map.addLayer(heat);
      map.addLayer(clusterGroup);
    });
  }
}

ReactDOM.render(< Map / >, document.getElementById('app'));
