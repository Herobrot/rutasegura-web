import React from 'react';
import styled from 'styled-components';

interface CardProps {
  titulo: string;
  valor: string | number;
  image: string;
}

const CardContainer = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const CardImage = styled.img`
  width: 36px;
  margin-left: auto;
`;

const CardValue = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  padding-bottom: 8px;
`;

const CardSubtitle = styled.p`
  color: #6c757d;
`;

export const Card: React.FC<CardProps> = ({ titulo, valor, image }, index) => {
  return (
    <CardContainer key={index}>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        <CardImage src={image} alt={titulo} />
      </CardHeader>
      <CardValue>{valor}</CardValue>
      <CardSubtitle>Datos del mes actual</CardSubtitle>
    </CardContainer>
  );
};

export default Card;
