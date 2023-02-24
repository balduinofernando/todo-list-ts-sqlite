import { app } from './app';

app.listen(process.env.APP_PORT || 3000,
    () => console.log(`API Executando em http://localhost:${process.env.APP_PORT}`)
);