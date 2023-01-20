import { Router } from 'express';

import { RootController } from '../../controller/rootController';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { rootValidation } from '../../validations/rootValidation';

const rootController = new RootController();
const rootRoutes = Router();

rootRoutes.post('/', rootValidation.create, rootController.createRoot);
rootRoutes.use(AuthMiddleware);
rootRoutes.get('/', rootController.indexRoot);
rootRoutes.put('/', rootValidation.update, rootController.updateRoot);
rootRoutes.delete('/', rootController.deleteRoot);

export { rootRoutes }