import React, { useState, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from "@material-tailwind/react";
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
interface TableRow {
  placa: string;
  chofer: string;
  modelo: string;
  estado: string;
  _id: string;
}

const TABLE_HEAD = ["Placa", "Modelo", "Chofer", "Estado", "Acciones"];
const TABLE_ROWS: TableRow[] = [
  { placa: "CJA-424-D", chofer: "John Michael", modelo: "Urban 2005", estado: "Activo" , _id: "1"},
];

const TableContainer = styled.div`
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 2.5rem 0;
  border-radius: 8px;
  padding: 1.25rem;
  background-color: white;
  height: 42rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #6c757d;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #38a169;
  border-radius: 50%;
  padding: 0.5rem;
  color: white;
  font-size: 1.75rem;
  width: 3vw;
  height: 3vw;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

const StyledCard = styled.div`
  width: 100%;
  overflow-y: auto;
  height: 88%;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 30rem;
  text-align: center;
`;

const StyledTh = styled.th`
  border-bottom: 1px solid #cbd5e0;
  background-color: #e2e8f0;
  padding: 1rem;
`;

const StyledTd = styled.td<{ isLast: boolean }>`
  padding: 1rem;
  border-bottom: ${({ isLast }) => (isLast ? 'none' : '1px solid #e2e8f0')};
`;

const ActionButton = styled.button<{ color: string }>`
  margin-right: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  color: white;
  border: none;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;
interface Unidad {
  placa: string;
  chofer: string;
  modelo: string;
  estado: string;
  _id: string;
}

const Tabla: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [tableRows, setTableRows] = useState<Unidad[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unidadToEdit, setUnidadToEdit] = useState<Unidad | undefined>(undefined);

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.rutasegura.xyz/unidades");
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      setTableRows(data);
      setIsLoading(false);
    } catch (error) {
      setError('Error al cargar los vehículos');
      setIsLoading(false);
    }
  };

  const handleAddButtonClick = () => {
    setUnidadToEdit(undefined);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUnidadToEdit(undefined);
  };

  const handleEdit = (id: string) => {
    const unidadToEdit = tableRows.find(unidad => unidad._id === id);
    if (unidadToEdit) {
      setUnidadToEdit(unidadToEdit);
      setShowModal(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo',
        cancelButtonText: 'Cancelar'
      });
  
      if (result.isConfirmed) {
        const response = await fetch(`https://api.rutasegura.xyz/unidades/unidad/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar el vehículo');
        }
  
        setTableRows(tableRows.filter(row => row._id !== id));
        Swal.fire(
          '¡Eliminado!',
          'El vehículo ha sido eliminado.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
      Swal.fire(
        'Error',
        'No se pudo eliminar el vehículo. Por favor, inténtalo de nuevo.',
        'error'
      );
    }
  };

const handleSubmit = async (unidad: Omit<Unidad, '_id' | 'estado'>) => {
  try {
    let response;
    if (unidadToEdit) {
      response = await fetch(`https://api.rutasegura.xyz/unidades/unidad/${unidadToEdit.placa}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unidad),
      });
    } else {
      response = await fetch("https://api.rutasegura.xyz/unidades", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(unidad),
      });
    }

    if (!response.ok) {
      throw new Error('Error al guardar el vehículo');
    }

    const savedUnidad = await response.json();

    if (unidadToEdit) {
      setTableRows(tableRows.map(row => row._id === unidadToEdit._id ? savedUnidad : row));
    } else {
      setTableRows([...tableRows, savedUnidad]);
    }

    handleCloseModal();
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: unidadToEdit ? 'Vehículo actualizado correctamente' : 'Vehículo guardado correctamente',
    });
  } catch (error) {
    console.error('Error al guardar el vehículo:', error);
    
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al guardar el vehículo. Por favor, inténtalo de nuevo.',
    });
  }
};

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TableContainer id="tabla_id">
      <Header>
        <div>
          <Title>Vehículos registrados</Title>
          <Subtitle>Lista de vehículos y choferes registrados</Subtitle>
        </div>
        <AddButton onClick={handleAddButtonClick}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </Header>
      <StyledCard>
        <StyledTable>
          <thead className="sticky top-0 bg-white">
            <tr>
              {TABLE_HEAD.map((head) => (
                <StyledTh key={head}>
                  <Typography variant="small" color="blue-gray" className="font-semibold text-lg leading-none opacity-70"placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                    {head}
                  </Typography>
                </StyledTh>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ placa, chofer, modelo, estado, _id }, index) => {
              const isLast = index === tableRows.length - 1;

              return (
                <tr key={_id}>
                  <StyledTd isLast={isLast}>
                    <Typography variant="small" color="blue-gray" className="font-normal"placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                      {placa}
                    </Typography>
                  </StyledTd>
                  <StyledTd isLast={isLast}>
                    <Typography variant="small" color="blue-gray" className="font-normal"placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                      {modelo}
                    </Typography>
                  </StyledTd>
                  <StyledTd isLast={isLast}>
                    <Typography variant="small" color="blue-gray" className="font-normal"placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                      {chofer}
                    </Typography>
                  </StyledTd>
                  <StyledTd isLast={isLast}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium text-green-600"placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                      {estado}
                    </Typography>
                  </StyledTd>
                  <StyledTd isLast={isLast}>
                    <div className="flex justify-center">
                      <ActionButton color="#ecc94b" onClick={() => handleEdit(_id)}>Editar</ActionButton>
                      <ActionButton color="#f56565" onClick={() => handleDelete(_id)}>Eliminar</ActionButton>
                    </div>
                  </StyledTd>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </StyledCard>

      <Modal 
        show={showModal} 
        onClose={handleCloseModal} 
        onSubmit={handleSubmit}
        unidadToEdit={unidadToEdit}
      />
    </TableContainer>
  );
};

export default Tabla;
