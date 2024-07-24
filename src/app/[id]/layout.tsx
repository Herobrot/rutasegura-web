import "../globals.css";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Conductor",
  description: "Chofer de la unidad"
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default RootLayout;

