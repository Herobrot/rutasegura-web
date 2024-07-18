
export const Card = ({ titulo, valor, image }:any) => {
    return (
      <div className="shadow shadow-gray-400 rounded p-5">
          <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">{titulo}</p>
              <img className="w-9 ml-auto" src={image} alt={titulo} />
          </div>
          <p className="text-4xl font-bold pb-2">{valor}</p>
          <p> + 10% desde el mes pasado</p>
      </div>
    )
  }
  
  export default Card;