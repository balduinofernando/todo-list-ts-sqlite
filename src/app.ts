import express, { Express } from 'express';
import 'dotenv/config';
import routes from './routes';

const app: Express = express();

app.use(express.json());
app.use(routes);

export { app };