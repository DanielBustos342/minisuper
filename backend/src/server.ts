// server.ts
import app from "./app";
import sequelize from "./db";

const PORT = 3001;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos sincronizada");
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error("No se puede conectar a la base de datos:", error);
  }
});
