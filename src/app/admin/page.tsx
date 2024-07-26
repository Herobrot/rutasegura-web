"use client"
import { useState, useEffect } from "react";
import styled from "styled-components";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import Card from "./components/Card";
import ChartSwitcher from "./components/ChartSwitcher";
import Tabla from "./components/Tabla";
import Sidebar from "./components/Sidebar";

import efectivo from './assets/efectivo.png'
import colectivo from './assets/colectivo.png'
import volante from './assets/volante.png'
import { StaticImageData } from "next/image";

const MainContent = styled.div<{ sidebarvisible: boolean }>`
  margin-left: ${({ sidebarvisible }) => (sidebarvisible ? '15vw' : '5vw')};
  transition: margin-left 0.3s;
  padding: 20px;
  flex: 1;
`;

const AppContent: React.FC = () => {
  const visible = useSidebar().visible;
  const [cardItems, setCardItems] = useState<{ titulo: string; valor: string; image: StaticImageData }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.rutasegura.xyz/pasajeros/ganancias/mes-actual');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
      
        setCardItems([
          { titulo: "Ganancias totales", valor: `$${data.gananciasTotales}`, image: efectivo },
          { titulo: "Vehiculos activos", valor: data.unidades.toString(), image: colectivo },
          { titulo: "Conductores", valor: data.conductores.toString(), image: volante },
        ]);
        setIsLoading(false);
      } catch (error:any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainContent sidebarvisible={visible}>
      <div id="estadistica_id" className="w-auto">
        <div className="px-20 pt-20">
          {isLoading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="grid grid-cols-2 gap-10 mb-4">
              {cardItems.map(({ titulo, valor, image }, index) => (
                <Card
                  key={index}
                  titulo={titulo}
                  valor={valor}
                  image={image.src}
                />
              ))}
            </div>
          )}
          <ChartSwitcher />
          <Tabla />
        </div>
      </div>
    </MainContent>
  );
}

export default function App() {
  return (
    <SidebarProvider>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <AppContent />
      </div>
    </SidebarProvider>
  );
}