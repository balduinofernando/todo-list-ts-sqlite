import { Router } from "express";
import PersonController from "./controllers/PersonController";
import UserController from "./controllers/UserController";

const routes = Router();

routes.get('/', new PersonController().index);
routes.post('/pessoa', new PersonController().save);
routes.get('/pessoa/:id', new PersonController().show);
routes.put('/pessoa/:id', new PersonController().update);
routes.delete('/pessoa/:id', new PersonController().delete);

// Users Routes
routes.get('/users', new UserController().index);
routes.post('/users', new UserController().save);
routes.get('/users/:id', new UserController().show);
routes.put('/users/:id', new UserController().update);
routes.delete('/users/:id', new UserController().delete);

export default routes;