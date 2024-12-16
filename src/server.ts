import app from "./app";
import connectDB from "./config/db";
import "./types/express/index"; // Ajusta la ruta según la estructura de tu proyecto

const PORT = process.env.PORT ;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
