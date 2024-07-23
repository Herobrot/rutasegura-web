// src/components/Tabla.tsx
import React, { useState, FormEvent } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import Modal from './Modal'; // Asegúrate de importar el componente Modal

interface TableRow {
  placa: string;
  chofer: string;
  modelo: string;
  estado: string;
}

const TABLE_HEAD = ["Placa", "Modelo", "Chofer", "Estado", "Acciones"];
const TABLE_ROWS = [
  {
    placa: "CJA-424-D",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-E",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-R",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-T",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-Y",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-U",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-I",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-O",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-P",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-A",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
  {
    placa: "CJA-424-S",
    chofer: "John Michael",
    modelo: "Urban 2005",
    estado: "Activo",
  },
];

const Tabla: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [tableRows, setTableRows] = useState<TableRow[]>(TABLE_ROWS);

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newVehicle: TableRow = {
      placa: formData.get('placa') as string,
      modelo: formData.get('modelo') as string,
      chofer: formData.get('chofer') as string,
      estado: "Activo"
    };
    setTableRows([...tableRows, newVehicle]);
    handleCloseModal();
  };

  return (
    <div id="tabla_id" className="w-full shadow shadow-gray-400 my-10 rounded p-5" style={{ height: "42rem" }}>
      <div>
        <div className="flex justify-between p-2">
          <p className="text-2xl font-bold">Vehiculos registrados</p>
          <button
            onClick={handleAddButtonClick}
            className="flex items-center justify-center bg-green-500 rounded-full text-2xl w-8 h-8 font-bold text-white"
          >
            +
          </button>
        </div>
        <p>Lista de vehiculos y choferes registrados</p>
      </div>

      <Card className="w-full overflow-y-scroll" style={{ height: "88%" }}>
        <table className="w-full min-w-max table-auto text-center">
          <thead className="sticky top-0 bg-white">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-semibold text-lg leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ placa, chofer, modelo, estado }, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={placa}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {placa}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {modelo}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {chofer}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium text-green-600">
                      {estado}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-normal">
                      <div className="flex justify-center">
                        <button className="mr-3 px-3 py-0.5 bg-yellow-300 rounded">
                          Editar
                        </button>
                        <button className="px-3 py-0.5 bg-red-500 rounded">
                          Eliminar
                        </button>
                      </div>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <Modal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </div>
  );
};

export default Tabla;
