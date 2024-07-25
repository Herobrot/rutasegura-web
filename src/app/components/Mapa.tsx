"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapMarkerAlt, FaRoute, FaSpinner } from "react-icons/fa";

// Ignorar temporalmente la verificación de tipos en esta línea
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

const customIcon = new L.Icon({
  iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Mapa: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const politecnicaPos: [number, number] = [16.614791, -93.090902];
  const jeshuaPos: [number, number] = [16.617189, -93.095396];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error(error);
        }
      );
    }

    const latlng = L.latLng(politecnicaPos[0], politecnicaPos[1]);
    const latlng2 = L.latLng(jeshuaPos[0], jeshuaPos[1]);
    const calculatedDistance = latlng.distanceTo(latlng2);
    setDistance(calculatedDistance);
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden m-5">
      <div className="p-4 bg-blue-500 text-white">
        <h2 className="text-xl font-bold flex items-center">
          <FaRoute className="mr-2" /> Mapa de Ruta
        </h2>
      </div>
      <div className="p-4">
        {distance && (
          <p className="text-gray-700 mb-2">
            <FaRoute className="inline mr-2 text-blue-500" />
            Distancia entre puntos: {distance.toFixed(2)} metros
          </p>
        )}
      </div>
      <div className="h-96 w-full">
        {position ? (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
              <Popup>Tu ubicación actual</Popup>
            </Marker>
            <Marker position={politecnicaPos} icon={customIcon}>
              <Popup>Politécnica</Popup>
            </Marker>
            <Marker position={jeshuaPos} icon={customIcon}>
              <Popup>Jeshua</Popup>
            </Marker>
            <Polyline positions={[politecnicaPos, jeshuaPos]} color="blue" />
          </MapContainer>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-100">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Mapa;