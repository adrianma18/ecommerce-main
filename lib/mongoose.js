import mongoose from "mongoose";

export async function iniciarMongoose() {
  //se revisa si ya hay una conexión
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  //se conecta a la base de datos
  return await mongoose.connect(process.env.MONGODB);
}
