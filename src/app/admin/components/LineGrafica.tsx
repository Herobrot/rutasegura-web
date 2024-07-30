import React, { useEffect, useState } from 'react';
import { LineChart as MUILineChart, axisClasses } from '@mui/x-charts';
import styled from 'styled-components';

const LineChartContainer = styled.div`
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
  { hora: '15:00', probabilidad: 0.05731922398589065 },
  { hora: '16:00', probabilidad: 0.06684303350970018 },
  { hora: '17:00', probabilidad: 0.06472663139329805 },
  { hora: '18:00', probabilidad: 0.06172839506172839 },
  { hora: '19:00', probabilidad: 0.059082892416225746 },
  { hora: '20:00', probabilidad: 0.06763668430335097 },
  { hora: '21:00', probabilidad: 0.059788359788359786 },
];

const valueFormatter = (value: number) => `${value * 100}%`;

const chartSetting = {
  yAxis: [
    {
      label: 'Probabilidad',
    },
  ],
  series: [{ dataKey: 'probabilidad', label: 'Probabilidades por Hora', valueFormatter }],
  height: 600,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const LineChart: React.FC = () => {
  const [dataset, setDataset] = useState(defaultDataset);
  const fecha = new Date().toISOString()

  useEffect(() => {
    fetch('https://api.rutasegura.xyz/pasajeros/ganancias/horas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fecha: fecha }),
    })
      .then((response) => response.json())
      .then((data) => {
        const probabilidadesPorHora = data.probabilidadesPorHora;
        const updatedDataset = Object.keys(probabilidadesPorHora).map((hora) => ({
          hora: `${hora}:00`,
          probabilidad: probabilidadesPorHora[hora],
        }));
        setDataset(updatedDataset);
      })
      .catch(() => {
        setDataset(defaultDataset);
      });
  }, []);

  return (
    <LineChartContainer>
      <Header>
        <div>
          <Title>Probabilidades por Hora</Title>
          <Subtitle>Gráfico de las probabilidades por hora</Subtitle>
        </div>
      </Header>
      <ChartContainer>
        <MUILineChart
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
    </LineChartContainer>
  );
};

export default LineChart;
