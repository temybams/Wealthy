import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {UserRoutes} from './modules/users/user.route';


const app = express()
const port = 5000;

// parsers option;
app.use(express.json());
app.use(cors());


// routes
// app.use('/api/products', ProductRoutes);
// app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
  res.send('Ecommerce Inventory Server is running..!')
})

export default app;