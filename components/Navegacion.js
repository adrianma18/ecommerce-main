import React, { useContext } from "react";
import { ContextProductos } from "@/components/ContextProductos";

import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

const Navegacion = () => {
  const { productosSeleccionados } = useContext(ContextProductos);

  return (
    <div className="sticky top-0 w-full h-20 flex justify-between items-center px-4 bg-blue-600 text-gray-300">
      {/* <div>
        <Link href={"/"}>
          <AiFillHome />
          <span className="ml-3 text-3xl text-white">Ecommerce</span>
        </Link>
      </div> */}
      <Link
        href={"/"}
        className="mr-3 text-2xl flex gap-3 hover:text-green-500">
        <AiFillHome />
        <span className="text-xl text-white">Ecommerce</span>
      </Link>
      <Link
        href={"/checkout"}
        className=" text-2xl flex gap-3 hover:text-green-500">
        <FaShoppingCart />
        <span className="text-base text-white">
          {productosSeleccionados.length} en Cesta de Compra
        </span>
      </Link>
    </div>
  );
};

export default Navegacion;
