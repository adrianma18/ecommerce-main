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

## Agregar imagenes

Las imagenes se agregan en la carpeta /public/productos

El nombre debe de ser el mismo del que se guarde en la colección de la base de datos de MongoDb.

## Inicialización Aplicación

Para iniciar la aplicación usar:

```bash
npm run dev
# or
yarn dev
# or
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador para ver el proyecto.
