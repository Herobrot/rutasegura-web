import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, axisClasses } from '@mui/x-charts';
import { SeriesValueFormatter } from '@mui/x-charts/internals';
import { format, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import CircularProgress from '@mui/material/CircularProgress';
type DataItem = {
  monto: number;
  dia: string;
}


const defaultDataset: DataItem[] = [
  { monto: 0, dia: 'Lunes' },
  { monto: 0, dia: 'Martes' },
  { monto: 0, dia: 'Miércoles' },
  { monto: 0, dia: 'Jueves' },
  { monto: 0, dia: 'Viernes' },
  { monto: 0, dia: 'Sábado' },
  { monto: 0, dia: 'Domingo' },
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





const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const Grafica: React.FC = () => {
  const [dataset, setDataset] = useState<DataItem[]>(defaultDataset);
  const [loading, setLoading] = useState(true);

  const fetchEarnings = async () => {
    setLoading(true);
    const weeks = [];
    const end = endOfWeek(new Date());
    const start = startOfWeek(new Date());
    weeks.push({
      label: `${format(start, 'yyyy-MM-dd')}`,
      value: `${format(end, 'yyyy-MM-dd')}`,
    });
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_APIURL+'/pasajeros/ganancias/semana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fechaInicio: weeks[0].label, fechaFin: weeks[0].value }),
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
          setDataset(defaultDataset);
        } finally {
          setLoading(false);
        }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  const tickPlacement = 'middle';
  const tickLabelPlacement = 'middle';

  return (
    <GraficaContainer id="grafica_id">
      <Header>
        <div>
          <Title>Ganancias mensuales</Title>
          <Subtitle>Gráfico de las ganancias mensuales de la empresa</Subtitle>
        </div>
      </Header>
      <ChartContainer>
        {loading ? (
          <LoaderContainer>
            <CircularProgress />
          </LoaderContainer>
        ) : (
          <BarChart
            dataset={dataset}
            xAxis={[
              {
                scaleType: 'band',
                dataKey: 'dia',
                tickPlacement,
                tickLabelPlacement,
              },
            ]}          
            {...chartSetting}
          />
        )}
      </ChartContainer>
    </GraficaContainer>
  );
};

export default Grafica;