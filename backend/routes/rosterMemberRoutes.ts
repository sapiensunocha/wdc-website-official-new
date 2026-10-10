import express from 'express';
import rosterMemberProtect from '../protectRoutes/rosterMemberProtect';
import {
  registerRosterMember, loginRosterMember, logoutRosterMember,
  getMyProfile, updateMyProfile, uploadCV,
  getOpportunities, applyToOpportunity,
  getMyDeployments, getMyEvents,
  forgotPassword, resetPassword,
} from '../controllers/rosterMemberController';
import { multerCV } from '../middleware/multer';

const router = express.Router();

router.post('/register', registerRosterMember);
router.post('/login', loginRosterMember);
router.post('/logout', logoutRosterMember);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', rosterMemberProtect, getMyProfile);
router.put('/me', rosterMemberProtect, updateMyProfile);
router.post('/me/cv', rosterMemberProtect, multerCV.single('cv'), uploadCV);
router.get('/opportunities', rosterMemberProtect, getOpportunities);
router.post('/opportunities/:id/apply', rosterMemberProtect, applyToOpportunity);
router.get('/my-deployments', rosterMemberProtect, getMyDeployments);
router.get('/events', rosterMemberProtect, getMyEvents);

export default router;
