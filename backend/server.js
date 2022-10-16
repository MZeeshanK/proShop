import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import products from './routes/products.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();
const app = express();
connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', products);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);
