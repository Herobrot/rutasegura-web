import Card from "./components/Card";
import Mapa from "./components/Mapa";
import Navbar from "./components/Navbar";
import { GPSProvider } from "./context/GpsContext";
import { UnidadProvider } from "./context/UnidadContext";
import { DistanciaProvider } from "./context/DistanciaContext";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <GPSProvider>
        <DistanciaProvider>
          <UnidadProvider>
            <Card />
            <Mapa />
          </UnidadProvider>
        </DistanciaProvider>
      </GPSProvider>
    </div>
  );
};

export default App;