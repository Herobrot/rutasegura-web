

export const Card = () => {
  return (
    <div className="shadow shadow-gray-400 rounded p-5 m-5">
      <div className="h-1/2 mb-10">
        <p className="text-2xl font-semibold">Ruta 123</p>
      </div>
      <div className="h-1/2 w-full flex">
        <div className="w-1/2">
        <p className="text-gray-500 font-semibold">Distancia:</p>
        <p>1.2 km</p>
        </div>
        <div className="w-1/2">
        <p className="text-gray-500 font-semibold">Duración:</p>
        <p>45 minutos</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
