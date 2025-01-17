import { elogs } from "lyria-logs";
import sequelize from "./db.js";
import User from "./models/User.js";


const initDB = async () => {
  try {
    await sequelize.authenticate();
    elogs.info("Conexión con la base de datos exitosa.");
    await sequelize.sync({ alter: true }); 
    elogs.info("Base de datos sincronizada.");
  } catch (error) {
    elogs.error("Error conectando a la base de datos: " + error);
  }
};

export default initDB;
