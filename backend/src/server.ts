// import express from "express";
// import cors from "cors";
// import router from "./routes/index";

// const app = express();
// const PORT = 3001;

// app.use(cors());
// app.use(express.json());

// app.use(router);

// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

import express from "express";
import sequelize from "./db";
import productRoutes from "./routes/index";

const app = express();
app.use(express.json());

// Rutas de productos
app.use("/api", productRoutes);

// Conexión y sincronización con la base de datos
sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(3001, () => {
    console.log("Servidor corriendo en http://localhost:3001");
  });
});
