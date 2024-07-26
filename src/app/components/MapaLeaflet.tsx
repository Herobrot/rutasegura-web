"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";

const customIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LeafletMapProps {
  position: [number, number] | null;
  closestUnit: { lat: number; long: number; } | null;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ position, closestUnit }) => {
  return (
    <div className="h-96 w-full">
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>Tu ubicación actual</Popup>
          </Marker>
          {closestUnit && (
            <Marker position={[closestUnit.lat, closestUnit.long]} icon={customIcon}>
              <Popup>Unidad más cercana</Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <div className="h-full flex items-center justify-center bg-gray-100">
          <FaMapMarkerAlt className="animate-spin text-4xl text-blue-500" />
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
