import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Layout from "./components/Layout";
import ButtonGradient from "./assets/svg/ButtonGradient";
import ChatBotComponent from "./components/chatbot";
import LoaderAnimation from "./components/loading";
import CookieConsent from "./components/CookieConsent.jsx";

// Pages
import HomePage from "./pages/home";
import NotfoundPage from "./pages/notfound";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import AboutPage from "./pages/about";
import TeamAndOrgPage from "./pages/about/team";
import ContactPage from "./pages/contact";
import DonorsPage from "./pages/donors";
import VisionPage from "./pages/vision";
import OurValuePage from "./pages/value";
import MissionPage from "./pages/mission";
import ProjectsPage from "./pages/project";
import WhatWeOfferPage from "./pages/offer";
import EagleProject from "./pages/project/eagle";
import MembershipPage from "./pages/membership";
import ImpactPage from "./pages/impact";
import NewsLetterPage from "./pages/newletter";
import CareerPage from "./pages/career";
import DemoPage from "./pages/demo";
import PrivacyPolicyPage from "./pages/privacyPolicy";
import TermsAndConditionPage from "./pages/termsCondition";
import WhatWeDo from "./pages/solution";
import Products from "./pages/product";
import News from "./pages/news";
import Events from "./pages/events";
import Story from "./pages/story";
import Africa from "./pages/where_we_work/africa";
import WhereWeWork from "./pages/where_we_work";
import Americas from "./pages/where_we_work/americas";
import Asia from "./pages/where_we_work/asia";
import Europe from "./pages/where_we_work/europe";
import MediaPage from "./pages/media";
import ShopPage from "./pages/shop";
import MichaelChat from "./pages/michael-chat";
import TrackersHub from "./pages/trackers";
import DisastersTracker from "./pages/trackers/disasters";
import AidTracker from "./pages/trackers/aid";
import PolicyTracker from "./pages/trackers/policy";
import ClimateTracker from "./pages/trackers/climate";
import PartnerWithUs from "./pages/partnerWithUs";
import CampaignsPage from "./pages/campaigns";
import CampaignDetail from "./pages/campaigns/CampaignDetail";
import GlobalMonitor from "./pages/monitor";
import TrainingPage from "./pages/training";
import ServicesPage from "./pages/services";
import SingleBlogDisplay from "./pages/blog";
import ReportsPage from "./pages/reports";
import ReportDetail from "./pages/reports/ReportDetail";
import AdminPage from "./pages/admin";
import ProfilePage from "./pages/profile";
import ProfileForm from "./pages/profileForm";
import UpdateProfile from "./pages/updateProfile";
import TypePage from "./pages/typePage";
import ProfileEnterprisePage from "./pages/ProfileEnterprisePage";

// Components used as pages
import PartnersPage from "./components/partner";
import CaseDetail from "./components/CaseDetail.jsx";
import NewsDetail from "./components/NewsDetail.jsx";
import EventsDetail from "./components/EventsDetail.jsx";
import ProductDetail from "./components/ProductDetail.jsx";

// Roster pages (standalone layouts — no shared header/footer)
import RosterPage from "./pages/roster";
import RosterApplyPage from "./pages/roster/apply";
import RosterLoginPage from "./pages/roster/login";
import RosterResetPasswordPage from "./pages/roster/reset-password";
import RosterDashboard from "./pages/roster/dashboard";
import RosterAdminPage from "./pages/roster/admin";
import RosterPartnerPage from "./pages/roster/partner";

// Disaster Heroes pages
import DisasterHeroesApply from "./pages/disaster-heroes/apply";
import DisasterHeroesLogin from "./pages/disaster-heroes/login";
import DisasterHeroesAdmin from "./pages/disaster-heroes/admin";
import DisasterHeroesDashboard from "./pages/disaster-heroes/dashboard";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <HelmetProvider>
      {loading && <LoaderAnimation />}

      <Routes>
        <Route element={<Layout />}>
          {/* Roster */}
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/roster/apply" element={<RosterApplyPage />} />
          <Route path="/roster/login" element={<RosterLoginPage />} />
          <Route path="/roster/reset-password" element={<RosterResetPasswordPage />} />
          <Route path="/roster/dashboard" element={<RosterDashboard />} />
          <Route path="/roster/admin" element={<RosterAdminPage />} />
          <Route path="/roster/partner" element={<RosterPartnerPage />} />
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Auth */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/type/:id" element={<TypePage />} />
          <Route path="/profile/update/:id" element={<UpdateProfile />} />
          <Route path="/profile/individual/complete/:id" element={<ProfileForm />} />
          <Route path="/profile/enterprise/complete/:id" element={<ProfileEnterprisePage />} />
          <Route path="/profile/npo/complete/:id" element={<ProfileEnterprisePage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/story" element={<Story />} />
          <Route path="/about/vision" element={<VisionPage />} />
          <Route path="/about/values" element={<OurValuePage />} />
          <Route path="/about/mission" element={<MissionPage />} />
          <Route path="/about/what-we-offer" element={<WhatWeOfferPage />} />
          <Route path="/about/partners" element={<PartnersPage />} />
          <Route path="/about/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/about/team" element={<TeamAndOrgPage />} />

          {/* What We Do */}
          <Route path="/solution" element={<WhatWeDo />} />
          <Route path="/global-products" element={<Products />} />
          <Route path="/global-products/:productName" element={<ProductDetail />} />
          <Route path="/cases/:caseName" element={<CaseDetail />} />

          {/* Impact & Reach */}
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/where-we-work" element={<WhereWeWork />} />
          <Route path="/where-we-work/africa" element={<Africa />} />
          <Route path="/where-we-work/americas" element={<Americas />} />
          <Route path="/where-we-work/asia" element={<Asia />} />
          <Route path="/where-we-work/europe" element={<Europe />} />
          <Route path="/media" element={<MediaPage />} />

          {/* News & Events */}
          <Route path="/news" element={<News />} />
          <Route path="/news/:newsName" element={<NewsDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventsName" element={<EventsDetail />} />

          {/* Disaster Heroes */}
          <Route path="/disaster-heroes/apply" element={<DisasterHeroesApply />} />
          <Route path="/disaster-heroes/login" element={<DisasterHeroesLogin />} />
          <Route path="/disaster-heroes/admin" element={<DisasterHeroesAdmin />} />
          <Route path="/disaster-heroes/dashboard" element={<DisasterHeroesDashboard />} />

          {/* Campaigns */}
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:slug" element={<CampaignDetail />} />

          {/* Global Monitor */}
          <Route path="/monitor" element={<GlobalMonitor />} />

          {/* Get Involved */}
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/donate" element={<DonorsPage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-demo" element={<DemoPage />} />

          {/* Training */}
          <Route path="/training" element={<TrainingPage />} />

          {/* Services */}
          <Route path="/services" element={<ServicesPage />} />

          {/* Resources */}
          <Route path="/newsletter" element={<NewsLetterPage />} />
          <Route path="/blog/:id" element={<SingleBlogDisplay />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/eagle" element={<EagleProject />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/:reportId" element={<ReportDetail />} />

          {/* Legal */}
          <Route path="/policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsAndConditionPage />} />

          {/* Shop */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Michael Chat */}
          <Route path="/michael-chat" element={<MichaelChat />} />

          {/* Trackers */}
          <Route path="/trackers" element={<TrackersHub />} />
          <Route path="/trackers/disasters" element={<DisastersTracker />} />
          <Route path="/trackers/aid" element={<AidTracker />} />
          <Route path="/trackers/policy" element={<PolicyTracker />} />
          <Route path="/trackers/climate" element={<ClimateTracker />} />

          {/* Admin */}
          <Route path="/management/wdc/worddisastercenter/admin" element={<AdminPage />} />

          {/* 404 */}
          <Route path="*" element={<NotfoundPage />} />
        </Route>
      </Routes>

      <ToastContainer />
      <CookieConsent />
      <ChatBotComponent />
      <ButtonGradient />
    </HelmetProvider>
  );
};

export default App;
