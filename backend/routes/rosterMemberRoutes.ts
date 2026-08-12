import express from 'express';
import rosterMemberProtect from '../protectRoutes/rosterMemberProtect';
import {
  registerRosterMember, loginRosterMember, logoutRosterMember,
  getMyProfile, updateMyProfile,
  getOpportunities, applyToOpportunity,
  getMyDeployments, getMyEvents,
  forgotPassword, resetPassword,
} from '../controllers/rosterMemberController';

const router = express.Router();

router.post('/register', registerRosterMember);
router.post('/login', loginRosterMember);
router.post('/logout', logoutRosterMember);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', rosterMemberProtect, getMyProfile);
router.put('/me', rosterMemberProtect, updateMyProfile);
router.get('/opportunities', rosterMemberProtect, getOpportunities);
router.post('/opportunities/:id/apply', rosterMemberProtect, applyToOpportunity);
router.get('/my-deployments', rosterMemberProtect, getMyDeployments);
router.get('/events', rosterMemberProtect, getMyEvents);

export default router;
