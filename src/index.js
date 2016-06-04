'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
// import L from 'mapbox.js';
import MapboxMap from 'react-mapboxmap';

//

class Example extends React.Component {
  render() {
    return <div className="map__wrapper">
        <MapboxMap
            mapId="mapbox.comic"
            zoomControl={false}
            center={[59.907433, 30.299848]} zoom={17}
            onMapCreated={this._onMapCreated}/>
    </div>;
  }
  _onMapCreated = (map, L) => {
    var marker = new L.Marker(new L.LatLng(59.907433, 30.299848));
    map.addLayer(marker);
  }
}

ReactDOM.render(<Example />, document.getElementById('content'));
