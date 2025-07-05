import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import multer from 'multer';
import productoRoutes from './src/routes/productosRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
const puerto=4000;


app.use(cors({
  origin: true,
  credentials: true
}));
app.use(bodyParser.json());

app.use('/productos', productoRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send(`Prueba del servidor api para los datos del host ${puerto}`);
});

const upload = multer({ dest: 'src/img' });

app.post('/productos/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }
  res.status(200).json({
    message: 'Imagen subida correctamente',
    filename: req.file.filename,
    path: req.file.path
  });
});

app.listen(puerto);