import express, { Express } from 'express';
import 'dotenv/config';
import './shared/lang/TranslatationsYup';
import router from './routes';

const app: Express = express();

app.use(express.json());
app.use(router);

export { app };