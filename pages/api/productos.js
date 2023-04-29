import { iniciarMongoose } from "../../lib/mongoose";
import Producto from "../../models/Producto";

//buscar y devolver todos los productos
export async function encontrarProductos() {
  return Producto.find().exec();
}

export default async function handle(req, res) {
  //se inicializa conexión a base de datos
  await iniciarMongoose();
  //se obtiene lista de ids
  const ids = req.query.ids;
  //si se proporcionan ids se buscan
  if (ids) {
    //se pasa del string de ids a un array, separado en comas
    const arrayIds = ids.split(",");
    // console.log(arrayIds);
    //se responde en json, mientras se espera que se busque en el modelo de productos de forma asincrona.
    res.json(
      await Producto.find({
        //query/consulta para mongodb
        _id: { $in: arrayIds },
      }).exec()
    );
  } else {
    //sino devuelve todos los productos
    res.json(await encontrarProductos());
  }
}
