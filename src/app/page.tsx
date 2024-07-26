import Card from "./components/Card";
import Mapa from "./components/Mapa";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Card />
      <Mapa />
    </div>
  );
};

export default App;