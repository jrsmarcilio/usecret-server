import { Router } from 'express';

import { userRoutes } from './userRoutes';
import { profileRoutes } from './profileRoutes';
import { userGroupRoutes } from './userGroupRoutes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/profile', profileRoutes);
routes.use('/user-group', userGroupRoutes);

export { routes }
