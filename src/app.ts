import express from 'express';
import { openDatabase } from './config/database';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log(`API Executando em http://localhost:3000`));