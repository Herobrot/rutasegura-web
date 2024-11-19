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

export async function GET(req: any, {params}: any) {
  return new Response(`${params.token}-${Math.random().toString()}`)
}

export function generateStaticParams() {
  return [{token: "1"}, {token: "2"}, {token: "3"}, {token: "4"}]
}

export default App;
