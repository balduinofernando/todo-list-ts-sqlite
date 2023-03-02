import { Router } from 'express';
import PersonController from './controllers/PersonController';
import UserController from './controllers/UserController';
import { checkJwt } from './shared/middlewares/authentication';
import { AuthenticationController } from './controllers/AuthenticationController';
const router = Router();

router.post('/login', new AuthenticationController().createToken);

router.get('/', new PersonController().index);
router.post('/pessoa', new PersonController().bodyValidator, new PersonController().save);
router.get('/pessoa/:id', new PersonController().show);
router.put('/pessoa/:id', new PersonController().update);
router.delete('/pessoa/:id', new PersonController().delete);

// Users Routes
router.get('/users', checkJwt, new UserController().index);
router.post('/users', checkJwt, new UserController().save);
router.get('/users/:id', checkJwt, new UserController().show);
router.put('/users/:id', checkJwt, new UserController().update);
router.delete('/users/:id', checkJwt, new UserController().delete);

export default router;