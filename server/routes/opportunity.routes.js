import express from 'express';
import OpportunityController from '../Controller/opportunity.js';


const router = express.Router();

// Configure multer for file uploads


// Public routes
router.get('/opportunities', OpportunityController.getOpportunities);
router.get('/opportunities/:id', OpportunityController.getOpportunityById);

// Admin routes
router.get('/admin/opportunities', OpportunityController.getAllOpportunities);
router.post('/admin/opportunities', OpportunityController.addOpportunity);
router.put('/admin/opportunities/:id', OpportunityController.updateOpportunity);
router.delete('/admin/opportunities/:id', OpportunityController.deleteOpportunity);

export default router;