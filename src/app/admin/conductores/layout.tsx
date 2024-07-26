import "../../globals.css";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Conductores",
  description: "Modulo Conductores"
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default RootLayout;

