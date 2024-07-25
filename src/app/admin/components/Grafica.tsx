import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, axisClasses } from '@mui/x-charts';
import { DatasetElementType } from '@mui/x-charts/internals';

type DataItem = {
  monto: number;
  dia: string;
}

const defaultDataset: DataItem[] = [
  { monto: 28, dia: 'Lunes' },
  { monto: 28, dia: 'Martes' },
  { monto: 41, dia: 'Miércoles' },
  { monto: 73, dia: 'Jueves' },
  { monto: 99, dia: 'Viernes' },
  { monto: 50, dia: 'Sábado' },
  { monto: 20, dia: 'Domingo' },
];

const valueFormatter = (value: number) => `${value}`;

const chartSetting = {
  yAxis: [
    {
      label: 'Monto',
    },
  ],
  series: [{ dataKey: 'monto', label: 'Ganancias mensuales', valueFormatter }],
  height: 600,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const GraficaContainer = styled.div`
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

const Grafica: React.FC = () => {
  const [dataset, setDataset] = useState<DataItem[]>(defaultDataset);

  useEffect(() => {
    
    setTimeout(() => {
      
      setDataset(defaultDataset); 
    }, 2000);
  }, []);

  const tickPlacement = 'middle';
  const tickLabelPlacement = 'middle';

  return (
    <GraficaContainer id="grafica_id">
      <Header>
        <div>
          <Title>Ganancias mensuales</Title>
          <Subtitle>Grafico de las ganancias mensuales de la empresa</Subtitle>
        </div>
      </Header>
      <ChartContainer>
        <BarChart
          dataset={dataset as unknown as DatasetElementType<DataItem>[]}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'dia',
              tickPlacement,
              tickLabelPlacement,
            },
          ]}
          {...chartSetting}
          loading={dataset.length === 0 || !dataset}
        />
      </ChartContainer>
    </GraficaContainer>
  );
};

export default Grafica;
