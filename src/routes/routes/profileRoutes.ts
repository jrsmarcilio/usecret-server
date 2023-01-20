import { Router } from 'express';

import { AuthMiddleware } from '../../middlewares/authMiddleware';
import ProfileController from '../../controller/ProfileController';
import { profileValidation } from '../../validations/profileValidation';

const profileController = new ProfileController();
const profileRoutes = Router();

profileRoutes.use(AuthMiddleware)
profileRoutes.get('/:id', profileController.indexProfile);
profileRoutes.post('/', profileValidation.create, profileController.createProfile);
profileRoutes.get('/', profileController.listProfiles);
profileRoutes.put('/:id', profileValidation.update, profileController.updateProfile);
profileRoutes.delete('/:id', profileValidation.delete, profileController.deleteProfile);

export { profileRoutes };

