import {Router} from 'express';
import {about} from './about';
import {login, signup, saveDashboard, getDashboard} from './controllers/account/lib';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/about.json', about);
router.post('/saveDashboard', saveDashboard);
router.post('/getDashboard', getDashboard);

export default router;