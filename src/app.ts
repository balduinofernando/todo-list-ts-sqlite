import express, { Express } from 'express';
import routes from './routes';

const app: Express = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log('API Executando em http://localhost:3000'));