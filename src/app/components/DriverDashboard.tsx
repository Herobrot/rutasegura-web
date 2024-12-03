// /components/DriverDashboard.tsx

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaUser, FaClock, FaMoneyBillWave, FaBus } from 'react-icons/fa';
import { format, subWeeks, startOfWeek, endOfWeek } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DriverDashboardProps {
  id: string | string[] | undefined; 
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ id }) => {
  const [earnings, setEarnings] = useState<number[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string>('');
  const [driver, setDriver] = useState<{ name: string; schedule: any[] } | null>(null);

  const generateWeeks = () => {
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const end = endOfWeek(subWeeks(new Date(), i));
      const start = startOfWeek(subWeeks(new Date(), i));
      weeks.push({
        label: `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`,
        value: `${format(start, 'yyyy-MM-dd')}_${format(end, 'yyyy-MM-dd')}`,
      });
    }
    return weeks;
  };

  const weeks = generateWeeks();

  useEffect(() => {
    if (id) {
      const driverId = Array.isArray(id) ? id[0] : id;
      if (typeof driverId === 'string') {
        fetchDriverInfo(driverId);
      }
    }
  }, [id]);

  useEffect(() => {
    if (selectedWeek) {
      const [startDate, endDate] = selectedWeek.split('_');
      fetchEarnings(startDate, endDate);
    } else {
      setSelectedWeek(weeks[0].value);
    }
  }, [selectedWeek]);

  const fetchDriverInfo = async (driverId: string) => {
    try {
      const response = await fetch(`http://35.153.187.71/users/info/${driverId}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setDriver({ name: data.nombre, schedule: data.schedule });
    } catch (error) {
      console.error('Error fetching driver info:', error);
    }
  };

  const fetchEarnings = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch('http://35.153.187.71/pasajeros/ganancias/semana', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fechaInicio: startDate, fechaFin: endDate }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setEarnings(data.earnings);
      setDays(data.days);
    } catch (error) {
      console.error('Error fetching weekly earnings:', error);
    }
  };

  const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(event.target.value);
  };

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Ganancias diarias ($)',
        data: earnings,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ganancias de la semana',
      },
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> Panel del Chofer
          </h1>
          <p className="text-gray-600 mt-2">Bienvenido de vuelta, {driver?.name || 'Juan Pérez'}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaMoneyBillWave className="mr-2 text-green-500" /> Ganancias de la Semana
            </h2>
            <div className="mb-4">
              <label htmlFor="weekSelector" className="block mb-2 text-sm font-medium text-gray-700">
                Seleccionar semana:
              </label>
              <select
                id="weekSelector"
                className="block w-full p-2 border border-gray-300 rounded-md"
                value={selectedWeek}
                onChange={handleWeekChange}
              >
                {weeks.map((week) => (
                  <option key={week.value} value={week.value}>
                    {week.label}
                  </option>
                ))}
              </select>
            </div>
            <Bar options={options} data={data} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaClock className="mr-2 text-blue-500" /> Horario de Trabajo
            </h2>
            <div className="space-y-2">
              {(driver?.schedule || []).map((day, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">{day.day}</span>
                  <span className="text-gray-600">{day.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaBus className="mr-2 text-yellow-500" /> Información de la Unidad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border rounded p-4">
              <h3 className="font-medium">Número de Unidad</h3>
              <p className="text-2xl font-bold text-blue-600">1234</p>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium">Modelo</h3>
              <p className="text-2xl font-bold text-blue-600">Urban</p>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-medium">Año</h3>
              <p className="text-2xl font-bold text-blue-600">2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
