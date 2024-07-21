"use client"

import Card from "./components/Card";
import Mapa from "./components/Mapa";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <div className='w-screen h-12 bg-blue-950 flex justify-center items-center'>
        <p className="text-white font-semibold">¡Feliz viaje!</p>
      </div>
      <Card />
      <Mapa />
    </div>
  );
};

export default App;
