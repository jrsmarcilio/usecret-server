import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares/authMiddleware';
import UserGroupController from '../../controller/userGroupController';
import { userGroupValidation } from '../../validations/userGroupValidation';

const userGroupController = new UserGroupController();
const userGroupRoutes = Router();

userGroupRoutes.use(AuthMiddleware);
userGroupRoutes.get('/:id', userGroupController.indexUserGroup);
userGroupRoutes.post('/', userGroupValidation.create, userGroupController.createUserGroup);
userGroupRoutes.get('/', userGroupController.listUserGroups);
userGroupRoutes.put('/:id', userGroupValidation.update, userGroupController.updateUserGroup);
userGroupRoutes.delete('/:id', userGroupValidation.delete, userGroupController.deleteUserGroup);

export { userGroupRoutes }
