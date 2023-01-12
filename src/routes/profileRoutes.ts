import { Router } from 'express';
import { AuthMiddleware } from 'src/middlewares/authMiddleware';
import ProfileController from '../controller/ProfileController';

const profileController = new ProfileController();
const routes = Router();

routes.use(AuthMiddleware)
routes.post('/', profileController.createProfile);
routes.get('/', profileController.listProfiles);
routes.get('/:id', profileController.getProfileById);
routes.put('/:id', profileController.updateProfile);
routes.delete('/:id', profileController.deleteProfile);

export { routes as profileRoutes };

