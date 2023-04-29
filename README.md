Esta es una aplicación de Ecommerce creada en Next.js
## Crear .env para asignar variables de base de datos en Mongodb y procesamiento de pagos con Stripe
se necesita crear una carpeta .env en la carpeta princial (ecommerce).
Aquí se necesita poner las siguientes variables:

MONGODB="aqui se pone la clave de la base de datos de Mongodb"
LLAVE_PUBLICA_STRIPE="Aquí se pone la clave pública de Stripe"
LLAVE_SECRETA_STRIPE="Aquí se pone la clave privada de stripe"

Para conseguir estas claves se necesita crear usuarios en Stripe y Mongodb.

ver documentación en:

[stripe](https://stripe.com/)
[mongoDb](https://mongodb.com/)

## Agregar productos a mongodb
en la base de datos de mongoDB se tiene que crear una collection con la siguiente estructura:
_id: Id generado automaticamente por MongoDb.
nombre: nombre del producto
descripcion: descripción del producto.
precio: precio del producto
categoria: categoria del producto.
foto: aquí se pega la ruta de la foto a utilizar, ya sea la ruta web o la ruta dentro de la aplicación si se adjuntaron al mismo.

## Inicialización Aplicación
Se deben de instalar las dependencias con el comando npm install
Para iniciar la aplicación usar:
```bash
npm run dev
# or
yarn dev
# or
```
Abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver el proyecto.

