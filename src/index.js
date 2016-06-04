'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import L from 'mapbox.js';
import MapboxMap from 'react-mapboxmap';
import style from './index.css';
//

class Map extends React.Component {
    render() {
        return <div className = {
                style.map
            } >
            < MapboxMap
        mapId = "mapbox.comic"
        zoomControl = {
            false
        }
        center = {
            [59.907433, 30.299848]
        }
        zoom = {
            17
        }
        onMapCreated = {
            this._onMapCreated
        }
        /> < /div > ;
    }
    _onMapCreated = (map, L) => {
        let heat = L.heatLayer([], {
            maxZoom: 12
        })
        let clusterGroup = new L.MarkerClusterGroup();

        let featureLayer = L.mapbox.featureLayer()
            .loadURL('./data/geojson/full/places.geojson')
            // .addTo(map);

        featureLayer.on('ready', () => {
            map.fitBounds(featureLayer.getBounds());
            featureLayer.eachLayer(l => {
                heat.addLatLng(l.getLatLng());
                clusterGroup.addLayer(l);
            });
            map.addLayer(heat)
            map.addLayer(clusterGroup)
        });

        window.map = map;
    }
}

ReactDOM.render( < Map / > , document.getElementById('content'));
