import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

export interface Unidad {
    placa: string;
    chofer: string;
    modelo: string;
    estado: string;
    _id: string;
    _idKit: string;
}
  
interface UnidadContextProps{
  unidad: Unidad | null;
  fetchUnidad: (_idKit: string) => void;
}

const UnidadContext = createContext<UnidadContextProps | undefined>(undefined);

export const useUnidad = () => {
  const context = useContext(UnidadContext);
  if (!context) {
    throw new Error('useUnidad debe ser usado dentro de UnidadProvider');
  }
  return context;
};

export const UnidadProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [unidad, setUnidad] = useState<Unidad | null>(null);

  const fetchUnidad = async (_idKit: string) => {
    try {
      const response = await fetch(`http://localhost:4000/unidades/kit/${_idKit}`);
      const data = await response.json();
      setUnidad(data.unidad);
    } catch (error) {
      console.error('Error fetching Unidad data:', error);
    }
  };

  const unidadValueProvider = useMemo(() => ({ unidad, fetchUnidad }), [unidad, fetchUnidad]);

  return (
    <UnidadContext.Provider value={unidadValueProvider}>
      {children}
    </UnidadContext.Provider>
  );
};
