import Card from "./components/Card";
import Mapa from "./components/Mapa";
import Navbar from "./components/Navbar";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./components/Mapa"), {
  ssr: false,
});

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Card />
      <DynamicMap />
    </div>
  );
};

export default App;