import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS configuration
const allowedOrigins = [
    "http://localhost:3000",
    "https://shehryarkhanfoundation.com"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    optionsSuccessStatus: 200
}));

// Serve uploaded files (make sure path is absolute)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server of SKF');
});

app.use('/api', userRoutes);
app.use('/api', contactRoutes);
app.use('/api', mediaRoutes);
app.use('/api', partnershipRoutes);
app.use('/api', programRoutes);
app.use('/api', projectRoutes);
app.use('/api', sponsorshipRoutes);
app.use('/api', volunteerRoutes);
app.use('/api', opportunityRoutes);
app.use('/api', featuredEventRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Connect to DB
connectDB();

// Error handling
process.on('uncaughtException', err => { console.error(err); process.exit(1); });
process.on('unhandledRejection', err => { console.error(err); process.exit(1); });

// Start server
app.listen(4000, "0.0.0.0", () => {
    console.log("Server running on port 4000");
});
