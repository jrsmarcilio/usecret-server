import { Router } from 'express';
import { AuthMiddleware } from 'src/middlewares/authMiddleware';
import UserGroupController from '../controller/userGroupController';

const userGroupController = new UserGroupController();
const routes = Router();

routes.use(AuthMiddleware);
routes.post('/', userGroupController.createUserGroup);
routes.get('/', userGroupController.listUserGroups);
routes.get('/:id', userGroupController.getUserGroupById);
routes.put('/:id', userGroupController.updateUserGroup);
routes.delete('/:id', userGroupController.deleteUserGroup);

export { routes as userGroupRoutes }
