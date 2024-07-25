import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Grafica from './Grafica';
import LineGrafica from './LineGrafica';
import barChartIcon from '../assets/graficaBarras.png';
import lineChartIcon from '../assets/lineChart.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.75);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ChartContainer = styled.div`
  position: relative;
`;

const ChartWrapper = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 1vw;
  right: 1vw;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5vw;
  transition: transform 0.2s ease;
  img {
    height: 2vw;
  }
  &:hover {
    transform: scale(1.2);
  }
`;

const ChartSwitcher: React.FC = () => {
  const [showBarChart, setShowBarChart] = useState(true);

  const toggleChart = () => {
    setShowBarChart(!showBarChart);
  };

  return (
    <ChartContainer>
      <ToggleButton onClick={toggleChart}>
        <img src={showBarChart ? lineChartIcon.src : barChartIcon.src} alt="Toggle Chart" />
      </ToggleButton>
      <ChartWrapper>
        {showBarChart ? <Grafica /> : <LineGrafica />}
      </ChartWrapper>
    </ChartContainer>
  );
};

export default ChartSwitcher;
