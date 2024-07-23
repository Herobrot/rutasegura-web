import { FaRoute, FaClock, FaUser, FaExclamationTriangle } from 'react-icons/fa';

export const Card = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 m-4 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <FaRoute className="mr-2 text-blue-500" />
          Ruta 123
        </h2>
        <div className="w-16 h-1 bg-blue-500 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 font-medium mb-1 flex items-center">
            <FaRoute className="mr-2 text-blue-500" />
            Distancia
          </p>
          <p className="text-2xl font-semibold text-gray-800">1.2 km</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium mb-1 flex items-center">
            <FaClock className="mr-2 text-blue-500" />
            Duración
          </p>
          <p className="text-2xl font-semibold text-gray-800">45 minutos</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium mb-1 flex items-center">
            <FaUser className="mr-2 text-blue-500" />
            Chofer
          </p>
          <p className="text-xl font-semibold text-gray-800">Juan Pérez</p>
          <p className="text-sm text-gray-600">ID: 12345</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium mb-1 flex items-center">
            <FaExclamationTriangle className="mr-2 text-yellow-500" />
            Quejas
          </p>
          <p className="text-xl font-semibold text-gray-800">2</p>
          <p className="text-sm text-gray-600">Últimos 30 días</p>
        </div>
      </div>
    </div>
  );
};

export default Card;