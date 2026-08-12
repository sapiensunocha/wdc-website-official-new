import client from "./rosterClient";

// ─── Member Auth ───────────────────────────────────────────────────────────────
export const registerRosterMember = (data) => client.post("/api/roster/member/register", data);
export const loginRosterMember = (data) => client.post("/api/roster/member/login", data);
export const logoutRosterMember = () => {
  localStorage.removeItem("roster_jwt");
  return client.post("/api/roster/member/logout");
};

// ─── Member Profile ────────────────────────────────────────────────────────────
export const getMyRosterProfile = () => client.get("/api/roster/member/me");
export const updateMyRosterProfile = (data) => client.put("/api/roster/member/me", data);

// ─── Member Opportunities & Deployments ────────────────────────────────────────
export const getRosterOpportunities = (params) => client.get("/api/roster/member/opportunities", { params });
export const applyToOpportunity = (id) => client.post(`/api/roster/member/opportunities/${id}/apply`);
export const getMyDeployments = () => client.get("/api/roster/member/my-deployments");
export const getMyEvents = () => client.get("/api/roster/member/events");

// ─── Admin Auth ────────────────────────────────────────────────────────────────
export const loginAdmin = (data) => client.post("/api/roster/admin/login", data);
export const logoutAdmin = () => client.post("/api/roster/admin/logout");

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
export const getAdminDashboard = () => client.get("/api/roster/admin/dashboard");
export const getAdminMembers = (params) => client.get("/api/roster/admin/members", { params });
export const getAdminMember = (id) => client.get(`/api/roster/admin/members/${id}`);
export const updateMemberStatus = (id, data) => client.put(`/api/roster/admin/members/${id}/status`, data);
export const addAdminNote = (id, data) => client.post(`/api/roster/admin/members/${id}/notes`, data);
export const deleteAdminNote = (id, noteIndex) => client.delete(`/api/roster/admin/members/${id}/notes/${noteIndex}`);

// ─── Admin Opportunities ──────────────────────────────────────────────────────
export const getAdminOpportunities = (params) => client.get("/api/roster/admin/opportunities", { params });
export const createOpportunity = (data) => client.post("/api/roster/admin/opportunities", data);
export const updateOpportunity = (id, data) => client.put(`/api/roster/admin/opportunities/${id}`, data);
export const selectMemberForOpportunity = (id, data) => client.post(`/api/roster/admin/opportunities/${id}/select-member`, data);

// ─── Admin Deployments ────────────────────────────────────────────────────────
export const getAdminDeployments = (params) => client.get("/api/roster/admin/deployments", { params });
export const updateDeployment = (id, data) => client.put(`/api/roster/admin/deployments/${id}`, data);

// ─── Admin Partners ───────────────────────────────────────────────────────────
export const getAdminPartners = () => client.get("/api/roster/admin/partners");
export const createPartner = (data) => client.post("/api/roster/admin/partners", data);
export const updatePartner = (id, data) => client.put(`/api/roster/admin/partners/${id}`, data);
export const updatePartnerAccess = (id, data) => client.put(`/api/roster/admin/partners/${id}/access`, data);

// ─── Admin Events ─────────────────────────────────────────────────────────────
export const getAdminEvents = () => client.get("/api/roster/admin/events");
export const createEvent = (data) => client.post("/api/roster/admin/events", data);
export const updateEvent = (id, data) => client.put(`/api/roster/admin/events/${id}`, data);
export const deleteEvent = (id) => client.delete(`/api/roster/admin/events/${id}`);

// ─── Admin Admins ─────────────────────────────────────────────────────────────
export const getAdmins = () => client.get("/api/roster/admin/admins");
export const createAdminUser = (data) => client.post("/api/roster/admin/admins", data);

// ─── Partner Auth ─────────────────────────────────────────────────────────────
export const loginPartner = (data) => client.post("/api/roster/partner/login", data);
export const logoutPartner = () => client.post("/api/roster/partner/logout");

// ─── Partner Portal ───────────────────────────────────────────────────────────
export const getPartnerProfile = () => client.get("/api/roster/partner/me");
export const updatePartnerProfile = (data) => client.put("/api/roster/partner/me", data);
export const browseRoster = (params) => client.get("/api/roster/partner/roster", { params });
export const requestDeployment = (data) => client.post("/api/roster/partner/request-deployment", data);
export const getPartnerDeployments = () => client.get("/api/roster/partner/deployments");
