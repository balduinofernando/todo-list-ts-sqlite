import express, { Request, Response } from 'express';

const app = express();

app.get('/', (request: Request, response: Response) => response.send('Ola Mundo'));


app.listen(3000, () => console.log(`API Executando em http://localhost:3000`));