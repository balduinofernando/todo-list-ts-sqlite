import express, { Express } from 'express';
import 'dotenv/config';
import router from './routes';

const app: Express = express();

app.use(express.json());
app.use(router);

export { app };