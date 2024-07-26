import { FaRoute, FaClock, FaUser, FaExclamationTriangle } from 'react-icons/fa';
import styled from 'styled-components';
import { useUnidad } from '../context/UnidadContext';

const CardContainer = styled.div`
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 1rem;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: scale(1.05);
  }
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  width: 4rem;
  height: 0.25rem;
  background-color: #3b82f6;
  border-radius: 0.25rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoBlock = styled.div``;

const InfoTitle = styled.p`
  color: #4a5568;
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
`;

const InfoValue = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`;

const SmallText = styled.p`
  font-size: 0.875rem;
  color: #718096;
`;

export const Card: React.FC<{ distancia: number; duracion: string }> = ({ distancia, duracion }) => {
  const { unidad } = useUnidad();

  return (
    <CardContainer>
      <Header>
        <Title>
          <FaRoute style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
          {unidad ? `Unidad ${unidad._idKit}` : "Unidad no encontrada"}
        </Title>
        <Divider />
      </Header>
      {unidad ? (
        <GridContainer>
          <InfoBlock>
            <InfoTitle>
              <FaRoute style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
              Distancia
            </InfoTitle>
            <InfoValue>{distancia} metros</InfoValue>
          </InfoBlock>
          <InfoBlock>
            <InfoTitle>
              <FaClock style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
              Duración
            </InfoTitle>
            <InfoValue>{duracion}</InfoValue>
          </InfoBlock>
          <InfoBlock>
            <InfoTitle>
              <FaUser style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
              Chofer
            </InfoTitle>
            <InfoValue>{unidad.chofer || "No asignado"}</InfoValue>
          </InfoBlock>
        </GridContainer>
      ) : (
        <GridContainer>
          <InfoBlock>
            <InfoTitle>
              <FaExclamationTriangle style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
              Error
            </InfoTitle>
            <InfoValue>No se encontró una unidad cercana</InfoValue>
          </InfoBlock>
        </GridContainer>
      )}
    </CardContainer>
  );
};

export default Card;
