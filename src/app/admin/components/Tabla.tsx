import { Card, Typography } from "@material-tailwind/react";

import colectivo from '../assets/colectivo.png'

const TABLE_HEAD = ["Vehiculo", "Chofer", "Horario", "Estado"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    estado: "Activo"
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    estado: "Activo"
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    estado: "Activo"
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
    estado: "Activo"
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    estado: "Activo"
  },
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    estado: "Activo"
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    estado: "Activo"
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    estado: "Activo"
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
    estado: "Activo"
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    estado: "Activo"
  },
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    estado: "Activo"
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    estado: "Activo"
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    estado: "Activo"
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
    estado: "Activo"
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    estado: "Activo"
  },
];

const Tabla = () => {
  return (
    <div id="tabla_id" className="w-full shadow shadow-gray-400 my-10 rounded p-5" style={{height: "42rem"}}>
      <div>
        <div className="flex text-center justify-between p-2">
            <p className="text-2xl font-bold">Vehiculos registrados</p>
            <img className="w-8" src={colectivo} alt="colectivo" />
        </div>
        <p>Lista de vehiculos y choferes registrados</p>
      </div>
      <Card className="w-full overflow-y-scroll" style={{height: "88%"}}>
        <table className="w-full min-w-max table-auto text-left">
          <thead className="sticky top-0 bg-white">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold text-lg leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, job, date, estado }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium text-green-600"
                    >
                      {estado}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Tabla;
