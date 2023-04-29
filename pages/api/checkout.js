import { iniciarMongoose } from "@/lib/mongoose";
import Producto from "@/models/Producto";
const stripe = require("stripe")(
  sk_test_51Lilq4D85sfyX3OZismsE3gJ2Orhh6PuFWZ92l6plwGCPsLoTILFvtxOuEvtRKVKehjp6on7CaRJkPGjx25iYgmw00APJjcPv9
);

export default async function handler(req, res) {
  await iniciarMongoose();

  const { correo } = req.body;
  const idsProducto = req.body.products.split(",");
  const ids = [...new Set(idsProducto)];
  const productos = await Producto.find({ _id: { $in: ids } }).exec();

  let productosLinea = [];
  for (let idProducto of ids) {
    const cantidad = idsProducto.filter((id) => id === idProducto).length;
    const producto = productos.find((p) => p._id.toString() === idProducto);
    productosLinea.push({
      quantity: cantidad,
      price_data: {
        currency: "EUR",
        product_data: { name: producto.nombre },
        unit_amount: producto.precio * 100,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: productosLinea,
    mode: "payment",
    customer_email: correo,
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
  });

  res.redirect(303, session.url);
}
