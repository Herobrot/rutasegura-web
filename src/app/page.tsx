"use client"

import Card from "./components/Card";
import Mapa from "./components/Mapa";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar></Navbar>
      <Card />
      <Mapa />
    </div>
  );
};

export default App;
