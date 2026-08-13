import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import dotenv from "dotenv";
import './utils/firestore'; // initialize Firestore via Application Default Credentials

// Roster routes (Firestore-backed)
import rosterMemberRoutes from "./routes/rosterMemberRoutes"
import rosterAdminRoutes from "./routes/rosterAdminRoutes"
import rosterPartnerRoutes from "./routes/rosterPartnerRoutes"
import chatRoutes from "./routes/chatRoutes"
import disasterHeroRoutes from "./routes/disasterHeroRoutes"

const app = express(); //Initialize Express Server
dotenv.config(); //Initialize dotenv

// Cloud Run sits behind Google's load balancer — trust its proxy headers
app.set('trust proxy', 1);

// Fail fast if required secrets are missing
const requiredEnv = ['JWTSK'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnv.join(', ')}`);
}
if (!process.env.RESEND_API_KEY) {
  console.warn('[Roster] RESEND_API_KEY not set — roster email notifications will be silently skipped');
}

//MIDDLEWARE
app.use(morgan("dev")); // Request Logger
app.use(express.json()); // Body Parser
app.use(express.urlencoded({ extended: true })); // Body Parser With URL Encoded
app.use(cookieParser()); // Cookie Parser
// Support comma-separated origins (e.g. www and non-www)
const allowedOrigins = (process.env.ALLOWED_ORIGIN || "http://localhost:5173")
  .split(",").map(o => o.trim()).filter(Boolean);
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error(`CORS blocked: ${origin}`));
  },
})); // CORS
app.use(rateLimit({ //Rate Limit / Limit Request per 15 minutes
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false, 
}));
app.use(hpp()); // Http Parameter Pollution
app.use(helmet()); // Security 

//ROUTES
app.use("/api/roster/member", rosterMemberRoutes);
app.use("/api/roster/admin", rosterAdminRoutes);
app.use("/api/roster/partner", rosterPartnerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/disaster-heroes", disasterHeroRoutes);
//Default Route
app.get("/", (req, res) => {
  res.send("API is running....");
});

//PORT
const port = process.env.PORT || 9000;

//Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
