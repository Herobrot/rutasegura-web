import { BarChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts";
const dataset = [
  {
    monto: 28,
    dia: "Lunes",
  },  
  {
    monto: 28,
    dia: "Martes",
  },
  {
    monto: 41,
    dia: "Miercoles",
  },
  {
    monto: 73,
    dia: "Jueves",
  },
  {
    monto: 99,
    dia: "Viernes",
  },
  {
    monto: 50,
    dia: "Sabado",
  },
  {
    monto: 20,
    dia: "Domingo",
  },
];

import grafico from "../assets/graficaBarras.png";

const valueFormatter = (value:any) => `$${value}`;

const chartSetting = {
  yAxis: [
    {
      label: "Monto",
    },
  ],
  series: [{ dataKey: "monto", label: "Ganancias mensuales", valueFormatter }],
  height: 600,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

const Grafica = () => {
  const tickPlacement = "middle";
  const tickLabelPlacement = "middle";

  return (
    <div id="grafica_id" className="w-full shadow mt-10 rounded p-5">
      <div className="flex">
        <div className="w-1/2">
          <p className="text-2xl font-semibold">Ganancias mensuales</p>
          <p>Grafico de las ganancias mensuales de la empresa</p>
        </div>
        <div className="w-1/2 flex justify-end">
          <img src={String(grafico)} className="h-8" alt="" />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <BarChart
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "dia",
              tickPlacement,
              tickLabelPlacement,
            },
          ]}
          {...chartSetting}
        />
      </div>
    </div>
  );
};

export default Grafica;