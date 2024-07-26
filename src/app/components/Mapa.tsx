"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FaRoute, FaSpinner } from "react-icons/fa";

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
    }}, []);

  

  const leafletMapMemo = useMemo(() => (
    <LeafletMap 
      position={position}
    />
  ), [position]);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden m-5">
      <div className="p-4 bg-blue-500 text-white">
        <h2 className="text-xl font-bold flex items-center">
          <FaRoute className="mr-2" /> Mapa de Ruta
        </h2>
      </div>
      {leafletMapMemo}
    </div>
  );
};

export default ContainerMap;
