"use client"

import DriverDashboard from "../components/DriverDashboard";
import Navbar from "../components/Navbar";
import { useParams } from 'next/navigation';


const App = () => {
  const { id } = useParams();
  return (
    <div className="w-screen h-screen">
        <Navbar />
        <DriverDashboard id={id} />
    </div>
  );
};

export default App;
