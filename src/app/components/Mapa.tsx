"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { FaRoute, FaSpinner } from "react-icons/fa";
import { Historial, useGPS } from "../context/GpsContext";
import { useUnidad } from "../context/UnidadContext";
import { useDistancia } from "../context/DistanciaContext";

const LeafletMap = dynamic(() => import("./MapaLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  ),
});

const ContainerMap: React.FC = () => {
  const { kits } = useGPS();
  const { fetchUnidad } = useUnidad();
  const { kitDistancia, setKitDistancia } = useDistancia();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [closestUnit, setClosestUnit] = useState<Historial | null>(null);

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

  useEffect(() => {
    if (position && kits.length > 0) {
      const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // in metres
        return distance;
      };

      let minDistance = Infinity;
      let nearestUnit = null;
      
      kits.forEach(kit => {
        kit.historial.forEach(entry => {
          const dist = calculateDistance(position[0], position[1], entry.lat, entry.long);
          if (dist < minDistance) {
            minDistance = dist;
            nearestUnit = entry;
            fetchUnidad(kit._idKit);            
          }
        });
      });

      setClosestUnit(nearestUnit);
    }
  }, [position, kits]);

  const leafletMapMemo = useMemo(() => (
    <LeafletMap 
      position={position} 
      closestUnit={closestUnit}
    />
  ), [position, closestUnit]);

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
