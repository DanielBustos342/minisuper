import express from "express";
import cors from "cors";
import router from "./routes";
import sequelize from "./db";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos sincronizada");
    console.log(`Servidor corriendo  http://localhost:${PORT}`);
  } catch (error) {
    console.error("No se puede conectar a la base de datos:", error);
  }
});
