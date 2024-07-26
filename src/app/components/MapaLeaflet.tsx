"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaExclamationTriangle, FaMapMarkerAlt, FaRoute, FaUser } from "react-icons/fa";
import { useGPS } from "../context/GpsContext";
import { useUnidad } from "../context/UnidadContext";
import { useDistancia } from "../context/DistanciaContext";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: scale(1.05);
  }
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  width: 4rem;
  height: 0.25rem;
  background-color: #3b82f6;
  border-radius: 0.25rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoBlock = styled.div``;

const InfoTitle = styled.p`
  color: #4a5568;
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
`;

const InfoValue = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`;

const SmallText = styled.p`
  font-size: 0.875rem;
  color: #718096;
`;

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
  const [kitDistancia, setKitDistancia] = useState<any>(null);
  const [unidad, setUnidad] = useState<any>(null);
  const [closestUnit, setClosestUnit] = useState<{ lat: number; long: number } | null>(null);
  console.log(position);
  console.log(kits);

  useEffect(() => {
    if (position && kits.length > 0) {
      let minDistance = Infinity;
      let nearestUnit = null;

      kits.forEach(kit => {
        kit.historial.forEach(entry => {
          const lat1 = L.latLng(position[0], position[1]);
          const lat2 = L.latLng(entry.lat, entry.long);
          const dist = lat1.distanceTo(lat2);
          console.log(dist);
          console.log(lat1);
          console.log(lat2);
          if (dist < minDistance) {
            minDistance = dist;
            nearestUnit = entry;

            setClosestUnit({
              lat: entry.lat,
              long: entry.long
            });

            setKitDistancia({
              _idKit: kit._idKit,
              distancia: minDistance
            });
            fetchUnidad(kit._idKit);
            setUnidad(kit);
          }
        });
      });
    }
  }, [position, kits]);

  return (
    <>
      <CardContainer>
        <Header>
          <Title>
            <FaRoute style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
            {unidad ? `Unidad ${unidad._idKit}` : "Unidad no encontrada"}
          </Title>
          <Divider />
        </Header>
        {unidad ? (
          <GridContainer>
            <InfoBlock>
              <InfoTitle>
                <FaRoute style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
                Distancia
              </InfoTitle>
              <InfoValue>{kitDistancia ? `${kitDistancia.distancia}m` : 'No se encontró una distancia cercana'} metros</InfoValue>
            </InfoBlock>
            <InfoBlock>
              <InfoTitle>
                <FaUser style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
                Chofer
              </InfoTitle>
              <InfoValue>{unidad.conductor || "No asignado"}</InfoValue>
            </InfoBlock>
          </GridContainer>
        ) : (
          <GridContainer>
            <InfoBlock>
              <InfoTitle>
                <FaExclamationTriangle style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
                Error
              </InfoTitle>
              <InfoValue>No se encontró una unidad cercana</InfoValue>
            </InfoBlock>
          </GridContainer>
        )}
      </CardContainer>
      <div className="h-96 w-full">
        {position ? (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
    </>
  );
};

export default LeafletMap;
