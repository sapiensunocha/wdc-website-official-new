import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "WDC Roster <roster@worlddisastercenter.org>";
const ADMIN_EMAIL = "office@worlddisastercenter.org";
const WDC_BLUE = "#009EDB";
const WDC_DARK = "#001129";

// ─── Shared Layout ─────────────────────────────────────────────────────────────
function wrap(body: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>World Disaster Center</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:${WDC_DARK};border-radius:16px 16px 0 0;padding:28px 36px;text-align:center;">
            <div style="font-size:11px;font-weight:700;letter-spacing:3px;color:${WDC_BLUE};text-transform:uppercase;margin-bottom:4px;">World Disaster Center</div>
            <div style="font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">WDC Roster</div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px;border-left:1px solid #e8edf2;border-right:1px solid #e8edf2;">
            ${body}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;border-radius:0 0 16px 16px;padding:20px 36px;border:1px solid #e8edf2;border-top:none;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;">World Disaster Center · roster@worlddisastercenter.org</p>
            <p style="margin:0;font-size:11px;color:#cbd5e1;">Deploying excellence in disaster response, one expert at a time.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(text: string, href: string): string {
  return `<div style="text-align:center;margin:28px 0 8px;">
    <a href="${href}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,${WDC_BLUE},#0072BC);color:#fff;font-weight:700;font-size:14px;border-radius:10px;text-decoration:none;">${text}</a>
  </div>`;
}

function statusBadge(status: string): string {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    applied:             { bg: "#e8f4fd", color: "#0072BC", label: "Application Received" },
    screening:           { bg: "#fff8e1", color: "#b45309", label: "Under Screening" },
    interview_scheduled: { bg: "#e8f4fd", color: "#0072BC", label: "Interview Scheduled" },
    background_check:    { bg: "#fff8e1", color: "#b45309", label: "Background Check" },
    contract_pending:    { bg: "#fce7f3", color: "#9d174d", label: "Contract Pending" },
    active:              { bg: "#e6f9f0", color: "#065f46", label: "Active Roster Member" },
    deployed:            { bg: "#e6f9f0", color: "#065f46", label: "Currently Deployed" },
    on_leave:            { bg: "#f1f5f9", color: "#475569", label: "On Leave" },
    suspended:           { bg: "#fee2e2", color: "#b91c1c", label: "Suspended" },
    rejected:            { bg: "#fee2e2", color: "#b91c1c", label: "Not Proceeding" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#475569", label: status };
  return `<span style="display:inline-block;padding:5px 14px;background:${s.bg};color:${s.color};border-radius:20px;font-size:12px;font-weight:700;">${s.label}</span>`;
}

// ─── Member: Welcome ───────────────────────────────────────────────────────────
export async function sendWelcomeMemberEmail(email: string, firstName: string) {
  const body = `
    <h2 style="margin:0 0 12px;font-size:24px;font-weight:800;color:${WDC_DARK};">Welcome to the WDC Roster, ${firstName}!</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Thank you for applying to join the World Disaster Center's global talent pool. Your application has been received and our team will review it carefully.
    </p>
    <div style="background:#f8fafc;border-left:4px solid ${WDC_BLUE};border-radius:0 10px 10px 0;padding:18px 20px;margin:0 0 24px;">
      <p style="margin:0;font-size:14px;color:#334155;font-weight:600;">What happens next:</p>
      <ol style="margin:10px 0 0;padding-left:18px;color:#64748b;font-size:14px;line-height:1.9;">
        <li>Our team reviews your profile and credentials</li>
        <li>You'll be invited to a skills screening call</li>
        <li>Background verification and reference checks</li>
        <li>Contract signing with WDC</li>
        <li>You're added to the active roster — deployable globally</li>
      </ol>
    </div>
    <p style="color:#64748b;font-size:14px;line-height:1.7;margin:0 0 24px;">
      In the meantime, log in to your dashboard to complete your profile. A complete profile (100%) significantly increases your chances of early deployment.
    </p>
    ${btn("Go to My Dashboard", "https://worlddisastercenter.org/roster/dashboard")}
    <p style="color:#94a3b8;font-size:13px;text-align:center;margin:16px 0 0;">
      Questions? Reply to this email or contact <a href="mailto:office@worlddisastercenter.org" style="color:${WDC_BLUE};">office@worlddisastercenter.org</a>
    </p>`;

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `Welcome to the WDC Roster, ${firstName}! Your application is under review.`,
    html: wrap(body),
  });
}

// ─── Member: Status Update ─────────────────────────────────────────────────────
export async function sendStatusUpdateEmail(
  email: string,
  firstName: string,
  newStatus: string,
  adminNote?: string
) {
  const messages: Record<string, string> = {
    screening:
      "Great news! Your application has passed initial review and is now moving to the screening phase. Our team will be in touch to schedule a preliminary call.",
    interview_scheduled:
      "Congratulations! You've been selected for an interview. Please check your dashboard for scheduling details and prepare to showcase your expertise.",
    background_check:
      "Your interview went well! We are now conducting background and reference verification. This typically takes 3-5 business days.",
    contract_pending:
      "Excellent news! You have passed all verifications. Your WDC deployment contract is being prepared. You will receive it shortly for review and signature.",
    active:
      "Welcome to the WDC Active Roster! Your contract is signed and you are now officially part of WDC's global talent pool. You can be deployed at any time.",
    deployed:
      "You have been matched and confirmed for a deployment. Please review the details in your dashboard and coordinate with your WDC focal point.",
    on_leave:
      "Your status has been updated to On Leave. We look forward to having you back on the active roster.",
    rejected:
      "Thank you for your interest in the WDC Roster. After careful review, we are unable to move forward with your application at this time. We encourage you to reapply in 6 months.",
  };

  const msg = messages[newStatus] || "Your roster status has been updated. Log in to your dashboard for details.";

  const body = `
    <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${WDC_DARK};">Roster Status Update</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">Hi ${firstName}, your WDC Roster status has been updated:</p>
    <div style="text-align:center;margin:0 0 24px;">${statusBadge(newStatus)}</div>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">${msg}</p>
    ${adminNote ? `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin:0 0 24px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Note from WDC Team</p>
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">${adminNote}</p>
    </div>` : ""}
    ${btn("View My Dashboard", "https://worlddisastercenter.org/roster/dashboard")}`;

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `WDC Roster: Your status has been updated`,
    html: wrap(body),
  });
}

// ─── Member: Deployment Confirmed ─────────────────────────────────────────────
export async function sendDeploymentConfirmedEmail(
  email: string,
  firstName: string,
  opportunityTitle: string,
  partnerName: string,
  location: string,
  startDate?: string
) {
  const body = `
    <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${WDC_DARK};">You've Been Deployed! 🎯</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Congratulations, ${firstName}! You have been selected for a deployment through the WDC Roster.
    </p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:22px;margin:0 0 24px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;width:120px;">Assignment</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;font-weight:700;">${opportunityTitle}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Partner Org</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${partnerName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Location</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${location}</td>
        </tr>
        ${startDate ? `<tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Start Date</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${startDate}</td>
        </tr>` : ""}
      </table>
    </div>
    <p style="color:#475569;font-size:14px;line-height:1.7;margin:0 0 20px;">
      Your WDC focal point will contact you within 24 hours with further instructions. Please review the full deployment details in your dashboard.
    </p>
    <div style="background:#e8f4fd;border-radius:10px;padding:16px 20px;margin:0 0 24px;">
      <p style="margin:0;font-size:13px;color:#0072BC;">
        <strong>Important:</strong> WDC protects you throughout this deployment. If you face any issues with the partner organization, contact us immediately at <a href="mailto:office@worlddisastercenter.org" style="color:#0072BC;">office@worlddisastercenter.org</a>
      </p>
    </div>
    ${btn("View Deployment Details", "https://worlddisastercenter.org/roster/dashboard")}`;

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `Deployment Confirmed: ${opportunityTitle} — ${partnerName}`,
    html: wrap(body),
  });
}

// ─── Admin: New Application Alert ─────────────────────────────────────────────
export async function sendNewApplicationAlert(
  applicantName: string,
  applicantEmail: string,
  skills: string[],
  country: string
) {
  const body = `
    <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${WDC_DARK};">New Roster Application</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      A new expert has applied to join the WDC Roster and is awaiting your review.
    </p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:22px;margin:0 0 24px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;width:120px;">Name</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;font-weight:700;">${applicantName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Email</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;"><a href="mailto:${applicantEmail}" style="color:${WDC_BLUE};">${applicantEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Country</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${country || "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Skills</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${skills?.slice(0, 5).join(", ") || "—"}</td>
        </tr>
      </table>
    </div>
    ${btn("Review in Admin Panel", "https://worlddisastercenter.org/roster/admin")}`;

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Roster Application: ${applicantName}`,
    html: wrap(body),
  });
}

// ─── Admin: New Partner Registration Alert ────────────────────────────────────
export async function sendNewPartnerAlert(orgName: string, orgType: string, contactEmail: string) {
  const body = `
    <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${WDC_DARK};">New Partner Account Created</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      A new partner organization account has been created in the WDC Roster system.
    </p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:22px;margin:0 0 24px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;width:160px;">Organization</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;font-weight:700;">${orgName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Type</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${orgType}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Contact Email</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;"><a href="mailto:${contactEmail}" style="color:${WDC_BLUE};">${contactEmail}</a></td>
        </tr>
      </table>
    </div>
    <p style="color:#94a3b8;font-size:13px;margin:0;">Remember to send the partner their protection documents and set their access level in the admin panel.</p>
    ${btn("Manage in Admin Panel", "https://worlddisastercenter.org/roster/admin")}`;

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Partner Account: ${orgName}`,
    html: wrap(body),
  });
}

// ─── Partner: Welcome ─────────────────────────────────────────────────────────
export async function sendPartnerWelcomeEmail(email: string, orgName: string) {
  const body = `
    <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${WDC_DARK};">Welcome to WDC Partner Portal, ${orgName}!</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Your partner account has been set up. You now have access to the World Disaster Center's certified talent pool — disaster professionals vetted, trained, and ready to deploy.
    </p>
    <div style="background:#f8fafc;border-left:4px solid ${WDC_BLUE};border-radius:0 10px 10px 0;padding:18px 20px;margin:0 0 24px;">
      <p style="margin:0 0 10px;font-size:14px;color:#334155;font-weight:600;">What's included in your partnership:</p>
      <ul style="margin:0;padding-left:18px;color:#64748b;font-size:14px;line-height:1.9;">
        <li><strong>1 month free deployment</strong> — your first expert, no charge</li>
        <li>Access to 1,200+ certified disaster professionals</li>
        <li>Filter by skill, language, sector, location, and availability</li>
        <li>WDC handles contracts, compliance, and protection</li>
        <li>Performance tracking and deployment history</li>
      </ul>
    </div>
    <p style="color:#475569;font-size:14px;line-height:1.7;margin:0 0 24px;">
      Your WDC representative will be in touch shortly regarding the partnership documentation. Once documents are signed, your full access will be activated.
    </p>
    ${btn("Access Partner Portal", "https://worlddisastercenter.org/roster/partner")}
    <p style="color:#94a3b8;font-size:13px;text-align:center;margin:16px 0 0;">
      Questions? Contact <a href="mailto:office@worlddisastercenter.org" style="color:${WDC_BLUE};">office@worlddisastercenter.org</a>
    </p>`;

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `Welcome to WDC Partner Portal — ${orgName}`,
    html: wrap(body),
  });
}

// ─── Partner: Deployment Request Confirmed ────────────────────────────────────
export async function sendDeploymentRequestConfirmation(
  email: string,
  orgName: string,
  expertName: string,
  assignmentTitle: string
) {
  const body = `
    <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${WDC_DARK};">Deployment Request Received</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Hi ${orgName}, your deployment request has been submitted and is being reviewed by the WDC team.
    </p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:22px;margin:0 0 24px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;width:140px;">Assignment</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;font-weight:700;">${assignmentTitle}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Expert Requested</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${expertName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Status</td>
          <td style="padding:6px 0;">${statusBadge("applied")}</td>
        </tr>
      </table>
    </div>
    <p style="color:#475569;font-size:14px;line-height:1.7;margin:0 0 24px;">
      WDC will confirm this deployment within <strong>48 hours</strong>. We will contact both you and the expert directly to coordinate the onboarding.
    </p>
    ${btn("View in Partner Portal", "https://worlddisastercenter.org/roster/partner")}`;

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `Deployment Request Submitted — ${expertName} for ${assignmentTitle}`,
    html: wrap(body),
  });
}

// ─── Member: Password Reset ────────────────────────────────────────────────────
export async function sendPasswordResetEmail(email: string, firstName: string, resetUrl: string) {
  const body = `
    <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${WDC_DARK};">Reset your password</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      Hi ${firstName}, we received a request to reset your WDC Roster password. Click the button below to choose a new one.
    </p>
    <div style="background:#fff8e1;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin:0 0 24px;">
      <p style="margin:0;font-size:13px;color:#92400e;">
        ⚠️ This link expires in <strong>1 hour</strong>. If you didn't request this, you can safely ignore this email.
      </p>
    </div>
    ${btn("Reset My Password", resetUrl)}
    <p style="color:#94a3b8;font-size:13px;text-align:center;margin:16px 0 0;">
      Having trouble? Contact <a href="mailto:office@worlddisastercenter.org" style="color:${WDC_BLUE};">office@worlddisastercenter.org</a>
    </p>`;

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Reset your WDC Roster password',
    html: wrap(body),
  });
}

// ─── Admin: New Deployment Request Alert ─────────────────────────────────────
export async function sendDeploymentRequestAlert(
  partnerName: string,
  expertName: string,
  assignmentTitle: string,
  location: string
) {
  const body = `
    <h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:${WDC_DARK};">New Deployment Request</h2>
    <p style="color:#475569;font-size:15px;line-height:1.7;margin:0 0 20px;">
      A partner has submitted a deployment request and is awaiting WDC approval.
    </p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:22px;margin:0 0 24px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;width:140px;">Partner</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;font-weight:700;">${partnerName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Expert</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${expertName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Assignment</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${assignmentTitle}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Location</td>
          <td style="padding:6px 0;font-size:14px;color:#1e293b;">${location}</td>
        </tr>
      </table>
    </div>
    ${btn("Review in Admin Panel", "https://worlddisastercenter.org/roster/admin")}`;

  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Deployment Request: ${partnerName} → ${expertName}`,
    html: wrap(body),
  });
}
