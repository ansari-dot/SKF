import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
// import routes files 
import userRoutes from './routes/user.routes.js'
import contactRoutes from './routes/contact.routes.js'
import mediaRoutes from './routes/media.routes.js'
import partnershipRoutes from './routes/partnership.routes.js'
import programRoutes from './routes/program.routes.js';
import projectRoutes from './routes/project.routes.js';
import sponsorshipRoutes from './routes/sponsorship.routes.js'
import volunteerRoutes from './routes/volunteer.routes.js'
import opportunityRoutes from './routes/opportunity.routes.js'
import featuredEventRoutes from './routes/featuredEvent.routes.js'
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Security middleware for production
if (process.env.NODE_ENV === 'production') {
  // Trust proxy for secure cookies
  app.set('trust proxy', 1);
  
  // Security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
}

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server');
});


// restful apis  

app.use('/api', userRoutes);
app.use('/api', contactRoutes);
app.use('/api', mediaRoutes)
app.use('/api', partnershipRoutes)
app.use('/api', programRoutes)
app.use('/api', projectRoutes)
app.use('/api', sponsorshipRoutes)
app.use('/api', volunteerRoutes)
app.use('/api', opportunityRoutes)
app.use('/api', featuredEventRoutes)








// to connect to the database
connectDB();

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

app.listen(4000, "0.0.0.0", () => {
  console.log( `Server running on http://localhost:4000` );
});