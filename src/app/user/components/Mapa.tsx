import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ignorar temporalmente la verificación de tipos en esta línea
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Mapa: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  var latlng = L.latLng(16.614791,-93.090902); //Politecnica
  var latlng2 = L.latLng(16.617189,-93.095396); //Jeshua

  var distance = latlng.distanceTo(latlng2);

  alert(`La distancia entre los dos puntos es: ${distance} metros`)

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
  }, []);

  return (
    <div className="w-auto shadow shadow-gray-400 rounded m-5" style={{ height: '30rem' }}>
      <div style={{ height: "30rem", width: "100%" }}>
        {position ? (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Ruta 1</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Mapa;
