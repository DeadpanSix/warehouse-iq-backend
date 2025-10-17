import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.routes.js';
import brandsRouter from './routes/brands.routes.js';
import statusRouter from './routes/status.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/status', statusRouter);

app.use(errorHandler);

export default app;
