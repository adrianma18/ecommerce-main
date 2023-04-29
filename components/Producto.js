import { useContext } from "react";
import { ContextProductos } from "./ContextProductos";

export default function Producto({ _id, nombre, precio, descripcion, foto }) {
  const { setProductosSeleccionados } = useContext(ContextProductos);

  //se va creando un array con los id de los productos anterior más los que se van agregando
  function agregarProducto() {
    setProductosSeleccionados((stateAnterior) => [...stateAnterior, _id]);
  }

  return (
    <div className="p-3 border-4 rounded-2xl border-slate-500">
      <div className="w-64">
        <div className="group">
          <div className=" p-5 mb-3 bg-slate-400 rounded-xl flex justify-center group-hover:scale-90 duration-500">
            <img
              className="max-h-36 group-hover:scale-150 duration-500 "
              src={foto}
            />
          </div>
        </div>
        <div className="mt-1">
          <h3 className="font-bold text-lg">{nombre}</h3>
        </div>
        <p className="text-sm mt-2">{descripcion}</p>
        <div className="flex mt-2 leading-4">
          <div className="text-2xl font-bold grow">€ {precio}</div>
          <button
            onClick={agregarProducto}
            className="bg-blue-600 hover:bg-green-600 duration-500 rounded-md text-white py-1 px-3">
            añadir a la cesta
          </button>
        </div>
      </div>
    </div>
  );
}
