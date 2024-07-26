"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FaRoute, FaSpinner } from "react-icons/fa";
import L from "leaflet";

const LeafletMap = dynamic(() => import("./MapaLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  ),
});

const ContainerMap: React.FC = () => {
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

  const leafletMapMemo = useMemo(() => (
    <LeafletMap 
      position={position} 
      politecnicaPos={politecnicaPos} 
      jeshuaPos={jeshuaPos} 
      distance={distance} 
    />
  ), [position, politecnicaPos, jeshuaPos, distance]);

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
      {leafletMapMemo}
    </div>
  );
};

export default ContainerMap;
