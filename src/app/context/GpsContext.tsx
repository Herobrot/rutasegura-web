"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

export interface Historial {
  fecha: string;
  lat: number;
  long: number;
  _id: string;
}

interface Kit {
  _idKit: string;
  historial: Historial[];
}

interface GPSContextProps {
  kits: Kit[];
  fetchGPSData: () => void;
}

const GPSContext = createContext<GPSContextProps | undefined>(undefined);

export const useGPS = () => {
  const context = useContext(GPSContext);
  if (!context) {
    throw new Error('useGPS debe de ser usado dentro de GPSProvider');
  }
  return context;
};

export const GPSProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [kits, setKits] = useState<Kit[]>([]);

  const fetchGPSData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APIURL+'/kits/gps/historial');
      const data = await response.json();
      setKits(data.unidades);
    } catch (error) {
      console.error('Error fetching GPS data:', error);
    }
  };

  useEffect(() => {
    fetchGPSData();
  }, []);

  const gpsValueProvider = useMemo(() => ({ kits, fetchGPSData }), [kits, fetchGPSData]);
  return (
    <GPSContext.Provider value={gpsValueProvider}>
      {children}
    </GPSContext.Provider>
  );
};
