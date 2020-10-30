import { router } from './Router.mjs';
import AuthRoutes from './auth.mjs';
import ProfileRoutes from './profile.mjs';
import DataRoutes from './data.mjs';
import FileRoutes from './file.mjs';

router.use('/auth', AuthRoutes);
router.use('/profile', ProfileRoutes);
router.use('/data', DataRoutes);
router.use('/file', FileRoutes);

export default router;
