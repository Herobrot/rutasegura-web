import "../globals.css";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Ruta Segura",
  description: "Ruta Segura es una aplicación que te permite compartir tu ubicación en tiempo real con tus seres queridos.",
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default RootLayout;

