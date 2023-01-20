import { Router } from 'express';

import { RootController } from '../../controller/rootController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { userValidation } from '../../validations/userValidation';

const rootController = new RootController();
const rootRoutes = Router();

rootRoutes.post('/', userValidation.create, rootController.createRoot);
rootRoutes.use(AuthMiddleware);
rootRoutes.get('/:id', userValidation.index, rootController.indexRoot);
rootRoutes.put('/:id', userValidation.update, rootController.updateRoot);
rootRoutes.delete('/:id', userValidation.delete, rootController.deleteRoot);

export { rootRoutes }