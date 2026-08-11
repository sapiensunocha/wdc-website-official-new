import express from 'express';
import rosterPartnerProtect from '../protectRoutes/rosterPartnerProtect';
import {
  loginPartner, logoutPartner,
  getPartnerProfile, updatePartnerProfile,
  browseRoster, requestDeployment, getPartnerDeployments,
} from '../controllers/partnerController';

const router = express.Router();

router.post('/login', loginPartner);
router.post('/logout', rosterPartnerProtect, logoutPartner);
router.get('/me', rosterPartnerProtect, getPartnerProfile);
router.put('/me', rosterPartnerProtect, updatePartnerProfile);
router.get('/roster', rosterPartnerProtect, browseRoster);
router.post('/request-deployment', rosterPartnerProtect, requestDeployment);
router.get('/deployments', rosterPartnerProtect, getPartnerDeployments);

export default router;
