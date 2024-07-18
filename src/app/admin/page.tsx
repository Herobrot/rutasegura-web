"use client"
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import Grafica from "./components/Grafica";

import efectivo from '../assets/efectivo.png'
import colectivo from '../assets/colectivo.png'
import cursor from '../assets/cursor.png'
import volante from '../assets/volante.png'

const cardItems = [
  { titulo: "Ganancias totales", valor: "$12,500", image: efectivo },
  { titulo: "Vahiculos activos", valor: "20", image: colectivo },
  { titulo: "Viajes de la semana", valor: "125", image: cursor },
  { titulo: "Conductores", valor: "19", image: volante },
];

export default function App() {
  return (
    <div className="w-auto">
      <NavBar />
      <div className="px-20 pt-10">
        <div className="grid grid-cols-2 gap-10">
          {
            cardItems.map(( {titulo, valor, image}, index ) => (
              <Card
                titulo={titulo}
                valor={valor}
                image={image}
              />
            ))
          }
        </div>
        <Grafica />
      </div>
    </div>
  );
}