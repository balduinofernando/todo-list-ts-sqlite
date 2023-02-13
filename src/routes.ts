import { Router } from "express";
import PersonController from "./controllers/PersonController";

const routes = Router();

routes.get('/', new PersonController().index);
routes.post('/pessoa', new PersonController().save);
routes.get('/pessoa/:id', new PersonController().show);
routes.put('/pessoa/:id', new PersonController().update);
routes.delete('/pessoa/:id', new PersonController().delete);

export default routes;