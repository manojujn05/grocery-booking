import dotenv from 'dotenv';
import express, { Express } from 'express';
import apiRouter from './routes/api';

dotenv.config();
const app: Express = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
