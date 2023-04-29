import { ContextProductos } from "@/components/ContextProductos";
import Navegacion from "@/components/Navegacion";
import React, { useContext, useEffect, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const checkout = () => {
  const { productosSeleccionados, setProductosSeleccionados } =
    useContext(ContextProductos);
  const [infoProductos, setInfoProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [correo, setCorreo] = useState("");

  //aqui se hace un llamado al api con los productos seleccionados
  //incluye dependencia a productosseleccionados para actualizar dom si cambia
  useEffect(() => {
    //para conseguir los ids unicos, sin repetir
    const ids = [...new Set(productosSeleccionados)];
    fetch("/api/productos?ids=" + ids.join(","))
      .then((respuesta) => respuesta.json())
      .then((json) => setInfoProductos(json));
  }, [productosSeleccionados]);

  function agregarProducto(id) {
    setProductosSeleccionados((estadoAnterior) => [...estadoAnterior, id]);
  }

  function disminuirProducto(id) {
    const posicion = productosSeleccionados.indexOf(id);
    if (posicion !== -1) {
      setProductosSeleccionados((prev) => {
        return prev.filter((id, index) => index !== posicion);
      });
    }
  }

  let subtotal = 0;
  if (productosSeleccionados?.length) {
    for (let id of productosSeleccionados) {
      const precio = infoProductos.find((p) => p._id === id)?.precio || 0;
      subtotal += precio;
    }
  }
  const costoEnvio = 0;
  const total = subtotal + costoEnvio;

  return (
    <div className="bg-white w-full h-full justify-center mb-12">
      <Navegacion />
      <div className="pt-10 pl-5 pr-5">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-10">Cesta de Compras</h2>
        </div>

        {!infoProductos.length ? (
          <div>No se encuentran productos en la cesta de compra</div>
        ) : (
          infoProductos.map((info, index) => {
            const cantidad = productosSeleccionados.filter(
              (id) => id === info._id
            ).length;
            if (cantidad === 0) {
              return;
            }
            return (
              <div className="flex justify-center" key={index}>
                <div className="lg:w-8/12">
                  <div className="flex mb-6">
                    <div className="bg-slate-500 shrink-0 p-3 rounded-lg">
                      <img className="w-28" src={info.foto} alt="" />
                    </div>
                    <div className="pl-5">
                      <h2 className="text-xl capitalize font-bold">
                        {info.nombre}
                      </h2>
                      <p className=" text-sm">{info.descripcion}</p>
                      <div className="flex">
                        <div className="grow text-2xl">€ {info.precio}</div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => disminuirProducto(info._id)}
                            className="text-3xl text-blue-600 hover:text-blue-500">
                            <AiFillMinusCircle />
                          </button>

                          <span className="text-3xl px-3 ">
                            {
                              productosSeleccionados.filter(
                                (id) => id === info._id
                              ).length
                            }
                          </span>

                          <button
                            onClick={() => agregarProducto(info._id)}
                            className="text-3xl text-green-600 hover:text-green-500">
                            <AiFillPlusCircle />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-8 mt-8">Ingresar Información</h2>
        </div>

        <div className="flex justify-center">
          <div className="w-full lg:w-8/12">
            <form action="/api/checkout" method="POST">
              <input
                value={nombre}
                name="nombre"
                onChange={(e) => setNombre(e.target.value)}
                className="bg-gray-100 rounded-lg w-full px-4 py-1 mb-2 placeholder-gray-500 border border-gray-500"
                type="text"
                placeholder="Nombre Completo"
              />
              <input
                value={direccion}
                name="direccion"
                onChange={(e) => setDireccion(e.target.value)}
                className="bg-gray-100 rounded-lg w-full px-4 py-1 mb-2 placeholder-gray-500 border border-gray-500"
                type="text"
                placeholder="Dirección"
              />
              <input
                value={ciudad}
                name="ciudad"
                onChange={(e) => setCiudad(e.target.value)}
                className="bg-gray-100 rounded-lg w-full px-4 py-1 mb-2 placeholder-gray-500 border border-gray-500"
                type="text"
                placeholder="Ciudad"
              />
              <input
                value={codigoPostal}
                name="codigoPostal"
                onChange={(e) => setCodigoPostal(e.target.value)}
                className="bg-gray-100 rounded-lg w-full px-4 py-1 mb-2 placeholder-gray-500 border border-gray-500"
                type="text"
                placeholder="Código Postal"
              />
              <input
                value={correo}
                name="correo"
                required
                onChange={(e) => setCorreo(e.target.value)}
                className="bg-gray-100 rounded-lg w-full px-4 py-1 mb-2 placeholder-gray-500 border border-gray-500"
                type="text"
                placeholder="Correo Electrónico"
              />

              <div className="mt-8">
                <div className="flex my-3">
                  <h3 className="grow font-bold text-gray-800">Subtotal:</h3>
                  <h3 className="font-semibold">€{subtotal}</h3>
                </div>
                <div className="flex my-3">
                  <h3 className="grow font-bold text-gray-800">Costo Envío:</h3>
                  <h3 className="font-semibold">€{costoEnvio}</h3>
                </div>
                <div className="flex my-3 border-t-4 border-blue-600 pt-2">
                  <h3 className="grow font-bold text-gray-800 ">Total:</h3>
                  <h3 className="font-bold">€{total}</h3>
                </div>
              </div>

              <input
                type="hidden"
                name="products"
                value={productosSeleccionados.join(",")}
              />
              <button
                type="submit"
                className="hover:bg-green-600 hover:shadow-blue-400 duration-500 bg-blue-600 text-white w-full px-4 py-2 rounded-lg font-bold mt-2 mb-2 shadow-lg shadow-green-400">
                Pagar €{total}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default checkout;
