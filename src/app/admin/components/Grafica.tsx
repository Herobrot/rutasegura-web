import React, { useEffect, useState } from 'react';
import { BarChart, axisClasses } from '@mui/x-charts';
import styled from 'styled-components';

const BarChartContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #6c757d;
`;

const ChartContainer = styled.div`
  width: 100%;
`;

const defaultDataset = [
  { hora: '7', monto: 340 },
  { hora: '8', monto: 940 },
  { hora: '9', monto: 1640 },
  { hora: '10', monto: 1180 },
  { hora: '11', monto: 700 },
  { hora: '12', monto: 1080 },
  { hora: '13', monto: 1000 },
  { hora: '14', monto: 1740 },
];

const valueFormatter = (value: number) => `$${value}`;

const chartSetting = {
  yAxis: [
    {
      label: 'Monto',
    },
  ],
  series: [{ dataKey: 'monto', label: 'Ganancias por Hora', valueFormatter }],
  height: 600,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const Grafica: React.FC = () => {
  const [dataset, setDataset] = useState(defaultDataset);

  useEffect(() => {
    const today = new Date().toISOString();

    fetch('https://api.rutasegura.xyz/pasajeros/ganancias/horas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fecha: today }),
    })
      .then((response) => response.json())
      .then((data) => {
        const gananciasPorHora = data.gananciasPorHora;
        const updatedDataset = Object.keys(gananciasPorHora).map((hora) => ({
          hora: `${hora}:00`,
          monto: gananciasPorHora[hora],
        }));
        setDataset(updatedDataset);
      })
      .catch(() => {
        setDataset(defaultDataset);
      });
  }, []);

  return (
    <BarChartContainer>
      <Header>
        <div>
          <Title>Ganancias por Hora</Title>
          <Subtitle>Gráfico de las ganancias por hora</Subtitle>
        </div>
      </Header>
      <ChartContainer>
        <BarChart
          dataset={dataset as unknown as any}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'hora',
            },
          ]}
          {...chartSetting}
          loading={!dataset || dataset.length === 0}
        />
      </ChartContainer>
    </BarChartContainer>
  );
};

export default Grafica;
