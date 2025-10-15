import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './routes/products.routes.js';
import brandsRouter from './routes/brands.routes.js';
import statusRouter from './routes/status.routes.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/status', statusRouter);

app.use(errorHandler);

export default app;
