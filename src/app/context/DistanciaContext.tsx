import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export interface KitDistancia {
  _idKit: string;
  distancia: number;
  duracion: string;
}

interface DistanciaContextType {
  kitDistancia: KitDistancia | null;
  setKitDistancia: React.Dispatch<React.SetStateAction<KitDistancia | null>>;
}

const DistanciaContext = createContext<DistanciaContextType | undefined>(undefined);

export const useDistancia = () => {
  const context = useContext(DistanciaContext);
  if (!context) {
    throw new Error('useDistancia debe ser usado dentro de DistanciaProvider');
  }
  return context;
};

export const DistanciaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [kitDistancia, setKitDistancia] = useState<KitDistancia | null>(null);

  const valueKitDistancia = useMemo(() => ({ kitDistancia, setKitDistancia }), [kitDistancia, setKitDistancia]);

  return (
    <DistanciaContext.Provider value={valueKitDistancia}>
      {children}
    </DistanciaContext.Provider>
  );
};
