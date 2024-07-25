"use client"
import styled from "styled-components";

import { SidebarProvider, useSidebar } from "../context/SidebarContext";

import Card from "./components/Card";
import ChartSwitcher from "./components/ChartSwitcher";
import Tabla from "./components/Tabla";
import Sidebar from "./components/Sidebar";

import efectivo from './assets/efectivo.png'
import colectivo from './assets/colectivo.png'
import cursor from './assets/cursor.png'
import volante from './assets/volante.png'


const MainContent = styled.div<{ sidebarvisible: boolean }>`
  margin-left: ${({ sidebarvisible }) => (sidebarvisible ? '15vw' : '5vw')};
  transition: margin-left 0.3s;
  padding: 20px;
  flex: 1;
`;

const cardItems = [
  { titulo: "Ganancias totales", valor: "$12,500", image: efectivo },
  { titulo: "Vehiculos activos", valor: "20", image: colectivo },
  { titulo: "Viajes de la semana", valor: "125", image: cursor },
  { titulo: "Conductores", valor: "19", image: volante },
];

const AppContent: React.FC = () => {
  const visible = useSidebar().visible;

  return (
    <MainContent sidebarvisible={visible}>
      <div id="estadistica_id" className="w-auto">
        <div className="px-20 pt-20">
          <div className="grid grid-cols-2 gap-10">
            {
              cardItems.map(( {titulo, valor, image}, index ) => (
                <Card
                  key={index}
                  titulo={titulo}
                  valor={valor}
                  image={image.src}                            
                  />
              ))
            }
          </div>
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