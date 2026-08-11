import express from 'express';
import rosterAdminProtect from '../protectRoutes/rosterAdminProtect';
import {
  seedSuperAdmin, loginAdmin, logoutAdmin,
  getDashboardStats,
  getMembers, getMemberById, updateMemberStatus, addAdminNote, deleteAdminNote,
  getPartners, createPartner, updatePartner, updatePartnerAccess,
  getOpportunities, createOpportunity, updateOpportunity, selectMemberForOpportunity,
  getDeployments, updateDeployment,
  getEvents, createEvent, updateEvent, deleteEvent,
  getAdmins, createAdminUser,
} from '../controllers/rosterAdminController';

const router = express.Router();

router.post('/seed', seedSuperAdmin);
router.post('/login', loginAdmin);
router.post('/logout', rosterAdminProtect, logoutAdmin);

router.get('/dashboard', rosterAdminProtect, getDashboardStats);

router.get('/members', rosterAdminProtect, getMembers);
router.get('/members/:id', rosterAdminProtect, getMemberById);
router.put('/members/:id/status', rosterAdminProtect, updateMemberStatus);
router.post('/members/:id/notes', rosterAdminProtect, addAdminNote);
router.delete('/members/:id/notes/:noteIndex', rosterAdminProtect, deleteAdminNote);

router.get('/partners', rosterAdminProtect, getPartners);
router.post('/partners', rosterAdminProtect, createPartner);
router.put('/partners/:id', rosterAdminProtect, updatePartner);
router.put('/partners/:id/access', rosterAdminProtect, updatePartnerAccess);

router.get('/opportunities', rosterAdminProtect, getOpportunities);
router.post('/opportunities', rosterAdminProtect, createOpportunity);
router.put('/opportunities/:id', rosterAdminProtect, updateOpportunity);
router.post('/opportunities/:id/select-member', rosterAdminProtect, selectMemberForOpportunity);

router.get('/deployments', rosterAdminProtect, getDeployments);
router.put('/deployments/:id', rosterAdminProtect, updateDeployment);

router.get('/events', rosterAdminProtect, getEvents);
router.post('/events', rosterAdminProtect, createEvent);
router.put('/events/:id', rosterAdminProtect, updateEvent);
router.delete('/events/:id', rosterAdminProtect, deleteEvent);

router.get('/admins', rosterAdminProtect, getAdmins);
router.post('/admins', rosterAdminProtect, createAdminUser);

export default router;
