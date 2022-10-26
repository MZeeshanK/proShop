import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import products from './routes/products.js';
import users from './routes/users.js';
import orders from './routes/orders.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();
connectDB();

const app = express();

// BODY Parser
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/orders', orders);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_SECRET)
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
);
