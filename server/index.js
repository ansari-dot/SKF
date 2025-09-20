import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import userRoutes from './routes/user.routes.js';
import contactRoutes from './routes/contact.routes.js';
import mediaRoutes from './routes/media.routes.js';
import partnershipRoutes from './routes/partnership.routes.js';
import programRoutes from './routes/program.routes.js';
import projectRoutes from './routes/project.routes.js';
import sponsorshipRoutes from './routes/sponsorship.routes.js';
import volunteerRoutes from './routes/volunteer.routes.js';
import opportunityRoutes from './routes/opportunity.routes.js';
import featuredEventRoutes from './routes/featuredEvent.routes.js';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();
const app = express();

// Fix __dirname in ES Module
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS configuration
const allowedOrigins = [
    "http://localhost:3000",
    "https://shehryarkhanfoundation.com",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        optionsSuccessStatus: 200,
    })
);

// ✅ Serve uploaded files correctly
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created uploads directory at: ${uploadsDir}`);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir, {
    setHeaders: (res, path) => {
        // Set proper cache control for images
        if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.gif')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
    },
    // Enable dotfiles (files starting with .) to be served
    dotfiles: 'allow'
}));

// Log file access errors only
app.use('/uploads', (req, res, next) => {
    const filePath = path.join(uploadsDir, req.path);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
    }
    next();
});

// Routes
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the server of SKF");
});

app.use("/api", userRoutes);
app.use("/api", contactRoutes);
app.use("/api", mediaRoutes);
app.use("/api", partnershipRoutes);
app.use("/api", programRoutes);
app.use("/api", projectRoutes);
app.use("/api", sponsorshipRoutes);
app.use("/api", volunteerRoutes);
app.use("/api", opportunityRoutes);
app.use("/api", featuredEventRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Connect to DB
connectDB();

// Error handling
process.on("uncaughtException", (err) => {
    console.error(err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(4000, "0.0.0.0", () => {
    console.log(`✅ Server running on port 4000`);
});