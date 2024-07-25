const navStyles = {
  background: "linear-gradient(to bottom, #09024b, #3636b0)"
}

export const NavBar = () => {
    return (
      <div className="text-white w-full h-12 flex items-center justify-end pr-10 fixed z-10" style={navStyles}>
          <a href="#estadistica_id" className="px-6 text-base">Estadisticas</a>
          <a href="#grafica_id" className="px-6 text-base">Ganancias</a>
          <a href="#tabla_id" className="px-6 text-base">Vehiculos</a>
      </div>
    );
  }
  
  export default NavBar;