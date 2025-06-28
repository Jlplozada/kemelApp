import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import productoRoutes from './src/routes/productosRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(bodyParser.json());

app.use('/productos', productoRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Prueba del servidor api para los datos del host 4000 ');
});

app.listen(4000);