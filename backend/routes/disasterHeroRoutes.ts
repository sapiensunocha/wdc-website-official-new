import { Router } from 'express';
import multer from 'multer';
import { register, login, logout, getMe, forgotPassword, resetPassword } from '../controllers/disasterHeroController';
import { adminListHeroes, adminUpdateStatus } from '../controllers/disasterHeroController';
import disasterHeroProtect from '../protectRoutes/disasterHeroProtect';
import rosterAdminProtect from '../protectRoutes/rosterAdminProtect';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// Member routes
router.post('/register', upload.single('photo'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', disasterHeroProtect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Admin routes (reuse existing roster admin JWT)
router.get('/admin/heroes', rosterAdminProtect, adminListHeroes);
router.patch('/admin/heroes/:id/status', rosterAdminProtect, adminUpdateStatus);

export default router;
