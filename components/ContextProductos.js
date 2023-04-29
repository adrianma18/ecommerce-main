import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ContextProductos = createContext({});

export function ProveedorContextProductos({ children }) {
  // aqui se usa una libreria para manejar el almacenamiento local en vez de usestate

  const [productosSeleccionados, setProductosSeleccionados] =
    useLocalStorageState("numeroProductos", { defaultValue: [] });

  return (
    <ContextProductos.Provider
      value={{ productosSeleccionados, setProductosSeleccionados }}>
      {children}
    </ContextProductos.Provider>
  );
}
