import React, { Component } from 'react';
import { Map, CircleMarker, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from './cities';
// import { Cities } from './cities';

class App extends Component {
  render() {
    var centerLat = (data.minLat + data.maxLat) / 2;
    var distanceLat = data.maxLat - data.minLat;
    var bufferLat = distanceLat * 0.15;
    var centerLong = (data.minLong + data.maxLong) / 2;
    var distanceLong = data.maxLong - data.minLong;
    var bufferLong = distanceLong * 0.15;
    return (
      <div>
        {/* < Cities /> */}
        <h3 style={{ textAlign: "center" }}>Most Populous Cities in Asia</h3>
        <Map
          style={{ height: "732px", width: "100%" }}
          zoom={2}
          center={[centerLat, centerLong]}
          bounds={[
            [data.minLat - bufferLat, data.minLong - bufferLong],
            [data.maxLat + bufferLat, data.maxLong + bufferLong]
          ]}
        >
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.city.map((city) => {
            return (
              <CircleMarker
                key={120}
                center={[city["coordinates"][1], city["coordinates"][0]]}
                radius={20 * Math.log(city["population"] / 10000000)}
                fillOpacity={0.5}
                stroke={false}
                >
                <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                  <span>{city["name"] + ": " + "Population" + " " + city["population"]}</span>
                </Tooltip>
              </CircleMarker>
            )
          })
          }
        </Map>
      </div>
    );
  }
}

export default App;
