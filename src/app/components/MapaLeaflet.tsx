"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useGPS } from "../context/GpsContext";
import { useUnidad } from "../context/UnidadContext";
import { useDistancia } from "../context/DistanciaContext";
import { useEffect, useState } from "react";


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
}

const LeafletMap: React.FC<LeafletMapProps> = ({ position }) => {
  const { kits } = useGPS();
  const { fetchUnidad } = useUnidad();
  const { setKitDistancia } = useDistancia();
  const [closestUnit, setClosestUnit] = useState({
    lat: 0,
    long: 0
  });

  useEffect(() => {
    if (position && kits.length > 0) {
      let minDistance = Infinity;
      let nearestUnit = null;
      
      kits.forEach(kit => {
        kit.historial.forEach(entry => {
          const lat1 = L.latLng(position[0], position[1]);
          const lat2 = L.latLng(entry.lat, entry.long);
          const dist = lat1.distanceTo(lat2);
          if (dist < minDistance) {
            minDistance = dist;
            nearestUnit = entry;

            setClosestUnit({
              lat: entry.lat,
              long: entry.long
            });

            setKitDistancia({
              _idKit: kit._idKit,
              distancia:  minDistance}
            );
            
            fetchUnidad(nearestUnit._id);
          }
        });
      });
    }
  }, [position, kits]);

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
