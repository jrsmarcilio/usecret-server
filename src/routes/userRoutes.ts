import { Router } from 'express';
import UserController from '../controller/userController';
import { AuthMiddleware } from '../middlewares/authMiddleware';

const userController = new UserController();
const routes = Router();

routes.post('/', userController.createUser);
routes.post('/login', userController.login);
routes.use(AuthMiddleware);
routes.get('/', userController.listUsers);
routes.get('/:id', userController.getUserById);
routes.get('/search/:username', userController.getUserByUsername);
routes.put('/:id', userController.updateUser);
routes.delete('/:id', userController.deleteUser);

export { routes as userRoutes }