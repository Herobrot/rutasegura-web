import Card from "./components/Card";
import Mapa from "./components/Mapa";
import Navbar from "./components/Navbar";
import { GPSProvider } from "./context/GpsContext";
import { UnidadProvider } from "./context/UnidadContext";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <GPSProvider>
        <UnidadProvider>
          <Card />
          <Mapa />
        </UnidadProvider>
      </GPSProvider>
    </div>
  );
};

export default App;