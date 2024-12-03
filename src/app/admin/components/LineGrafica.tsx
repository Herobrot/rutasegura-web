import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LineChart as MUILineChart, axisClasses } from '@mui/x-charts';
import { SeriesValueFormatter } from '@mui/x-charts/internals';
import { format, subWeeks, startOfWeek, endOfWeek } from 'date-fns';

interface DataItem {
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

const valueFormatter: SeriesValueFormatter<number | null> = (value) => {
    if (value === null) {
      return '';
    }
    return value.toString();
  };
  

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

const LineChart: React.FC = () => {
  const [dataset, setDataset] = useState<DataItem[]>(defaultDataset);
  const [selectedWeek, setSelectedWeek] = useState<string>('');

  const fetchEarnings = async () => {
    const weeks = [];
    const end = endOfWeek((new Date() ));
      const start = startOfWeek((new Date() ));
      weeks.push({
        label: `${format(start, 'yyyy-MM-dd')}`,
        value: `${format(end, 'yyyy-MM-dd')}`,
      });
    try {
      const response = await fetch('http://35.153.187.71/pasajeros/ganancias/semana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fechaInicio: weeks[0].label, fechaFin:  weeks[0].value }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.days && data.earnings && Array.isArray(data.days) && Array.isArray(data.earnings) && data.days.length === data.earnings.length) {
        const formattedData = data.days.map((day: string, index: number) => ({
          dia: day,
          monto: data.earnings[index]
        }));
        setDataset(formattedData);
      } else {
        console.error('Los datos recibidos no tienen el formato esperado');
        setDataset(defaultDataset);
      }
    } catch (error) {
      console.error('Error fetching weekly earnings:', error);
    }
  };

  useEffect(() => {
    
    setTimeout(() => {
       const [startDate, endDate] = selectedWeek.split('_');
       fetchEarnings();
      setDataset(defaultDataset); 
    }, 2000);
  }, []);

  const tickPlacement = 'middle';
  const tickLabelPlacement = 'middle';

  return (
    <LineChartContainer id="linechart_id">
      <Header>
        <div>
          <Title>Ganancias Semanales</Title>
          <Subtitle>Gráfico de las ganancias mensuales de la empresa</Subtitle>
        </div>        
      </Header>
      <ChartContainer>
        <MUILineChart
          dataset={dataset as unknown as any}
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
    </LineChartContainer>
  );
};

export default LineChart;
