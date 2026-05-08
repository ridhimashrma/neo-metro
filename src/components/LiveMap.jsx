import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const LiveMap = ({ lat, lon }) => {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lon]}>
        <Popup>
          Current User Location
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LiveMap;