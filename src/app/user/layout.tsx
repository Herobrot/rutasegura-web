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
    <html lang="es-MX">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link href="https://fonts.googleapis.com/css?family=Blinker" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/88239f68d2.js" crossOrigin="anonymous"></script>
      </head>
      <body className="preLoad">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

