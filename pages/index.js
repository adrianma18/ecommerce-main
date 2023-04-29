import Producto from "@/components/Producto";
import { useEffect, useState } from "react";
import Navegacion from "@/components/Navegacion";
import { iniciarMongoose } from "@/lib/mongoose";
import { encontrarProductos } from "./api/productos";

export default function Home({ productos }) {
  const [busqueda, setBusqueda] = useState("");

  //se utiliza set para eliminar duplicados y el spread operator para ponerlos dentro de un array
  const nombreCategoria = [...new Set(productos.map((p) => p.categoria))];

  if (busqueda) {
    productos = productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda)
    );
  }

  return (
    <>
      <Navegacion />

      <div>
        <div className="sticky top-20 w-full flex justify-center pt-1">
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            type="text"
            placeholder="Buscar Producto"
            className="w-10/12 bg-gray-200 py-2 px-4 rounded-md border-4 border-slate-500 placeholder-slate-600"
          />
        </div>

        <div>
          {nombreCategoria.map((nombreCategoria) => (
            <div key={nombreCategoria}>
              {/* para solo mostrar las categorias de la busqueda */}
              {productos.find((p) => p.categoria === nombreCategoria) && (
                <div>
                  <h2 className="italic text-2xl font-bold capitalize text-blue-600 my-12 ml-5">
                    {nombreCategoria}
                  </h2>

                  <div className="flex snap-x overflow-x-scroll no-scrollbar">
                    {productos
                      .filter((p) => p.categoria === nombreCategoria)
                      .map((infoProducto, index) => (
                        <div key={index} className="px-4 snap-start">
                          <Producto {...infoProducto} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await iniciarMongoose();
  const productos = await encontrarProductos();
  return {
    props: {
      productos: JSON.parse(JSON.stringify(productos)),
    },
  };
}
