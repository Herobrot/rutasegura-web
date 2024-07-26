import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { Typography } from "@material-tailwind/react";
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface TableRow {
  placa: string;
  chofer: string;
  modelo: string;
  estado: string;
}

const TABLE_HEAD = ["Placa", "Modelo", "Chofer", "Estado", "Acciones"];
const TABLE_ROWS: TableRow[] = [
  { placa: "CJA-424-D", chofer: "John Michael", modelo: "Urban 2005", estado: "Activo" }
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
                  <Typography variant="small" color="blue-gray" className="font-semibold text-lg leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {head}
                  </Typography>
                </StyledTh>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ placa, chofer, modelo, estado }, index) => {
              const isLast = index === tableRows.length - 1;

              return (
                <tr key={placa}>
                  <StyledTd isLast={isLast}>
                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {placa}
                    </Typography>
                  </StyledTd>
                  <StyledTd isLast={isLast}>
                  <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {modelo}
                    </Typography>
                  </StyledTd>
                  <StyledTd isLast={isLast}>
                  <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {chofer}
                    </Typography>
                  </StyledTd>
                  <StyledTd isLast={isLast}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium text-green-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {estado}
                    </Typography>
                  </StyledTd>
                  <StyledTd isLast={isLast}>
                    <div className="flex justify-center">
                      <ActionButton color="#ecc94b">Editar</ActionButton>
                      <ActionButton color="#f56565">Eliminar</ActionButton>
                    </div>
                  </StyledTd>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </StyledCard>

      <Modal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </TableContainer>
  );
};

export default Tabla;
