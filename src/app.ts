import express, { Express } from 'express';
import 'dotenv/config';
import routes from './routes';

const app: Express = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.APP_PORT || 3000,
    () => console.log(`API Executando em http://localhost:${process.env.APP_PORT}`)
);