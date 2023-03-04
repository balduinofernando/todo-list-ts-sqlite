import { Router } from 'express';
import PersonController from './controllers/PersonController';
import UserController from './controllers/UserController';
import { checkJwt } from './shared/middlewares/authentication';
import { AuthenticationController } from './controllers/AuthenticationController';
import { TodoController } from './controllers/TodoController';
const router = Router();

router.post('/login', new AuthenticationController().createToken);

router.get('/people', new PersonController().index);
router.post('/people', new PersonController().bodyValidator, new PersonController().save);
router.get('/people/:id', new PersonController().show);
router.put('/people/:id', new PersonController().update);
router.delete('/people/:id', new PersonController().delete);

// Users Routes
router.get('/users', new UserController().index);
router.post('/users', new UserController().save);
router.get('/users/:id', new UserController().show);
router.put('/users/:id', new UserController().update);
router.delete('/users/:id', new UserController().delete);
//router.delete('/users/:id', checkJwt, new UserController().delete);

router.get('/todos', new TodoController().index);
router.post('/todos', new TodoController().store);
router.get('/todos/:id', new TodoController().show);
router.put('/todos/:id', new TodoController().update);
router.delete('/todos/:id', new TodoController().delete);

export default router;