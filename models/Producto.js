//En este código se define un esquema o modelo de Mongoose
//El modelo define las propiedades del objeto "Producto"
//Este se va a almacenar en la base de datos noSql de MongoDB

import { model, models, Schema } from "mongoose";

//se define nuevo esquema/modelo para crear estructuras de datos
const SchemaProducto = new Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  categoria: String,
  foto: String,
});

//se comprueba si ya existe modelo y se asigna a constante, sino se crea.
const Producto = models?.Producto || model("Producto", SchemaProducto);

export default Producto;
