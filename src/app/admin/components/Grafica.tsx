import { BarChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts";
const dataset = [
  {
    monto: 21,
    mes: "Enero",
  },  
  {
    monto: 28,
    mes: "Febrero",
  },
  {
    monto: 41,
    mes: "Marzo",
  },
  {
    monto: 73,
    mes: "Abril",
  },
  {
    monto: 99,
    mes: "Mayo",
  },
  {
    monto: 144,
    mes: "Junio",
  },
  {
    monto: 319,
    mes: "Julio",
  },
  {
    monto: 249,
    mes: "Agosto",
  },
  {
    monto: 131,
    mes: "Septiembre",
  },
  {
    monto: 55,
    mes: "Octubre",
  },
  {
    monto: 48,
    mes: "Noviembre",
  },
  {
    monto: 25,
    mes: "Diciembre",
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
    <div className="w-full shadow mt-10 rounded p-5">
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
              dataKey: "mes",
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