import { Router } from 'express';
import UserGroupController from '../controller/userGroupController';

const userGroupController = new UserGroupController();
const routes = Router();

routes.post('/', userGroupController.createUserGroup);
routes.get('/', userGroupController.listUserGroups);
routes.get('/:id', userGroupController.getUserGroupById);
routes.put('/:id', userGroupController.updateUserGroup);
routes.delete('/:id', userGroupController.deleteUserGroup);

export { routes as userGroupRoutes }
