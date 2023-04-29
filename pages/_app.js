import { ProveedorContextProductos } from "@/components/ContextProductos";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    //se envuelve la aplicación con el contexto para manejar el state.
    <ProveedorContextProductos>
      <Component {...pageProps} />
    </ProveedorContextProductos>
  );
}
