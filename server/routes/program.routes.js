import express from "express";
import ProgramController from "../Controller/program.js";
import { auth } from "../middleware/auth.js";
import upload from '../util/multer.js'
const router = express.Router();

//Get all programs (accessible by  users & admins)
router.get("/program/get", ProgramController.getPrograms);

//  Add program (Admin only)
router.post("/program/add", auth, upload.single('image'), ProgramController.addProgram);

//  Update program (Admin only)
router.put("/program/update/:id", auth, upload.single('image'), ProgramController.updateProgram);

//  Delete program (Admin only)
router.delete("/program/delete/:id", auth, ProgramController.deleteProgram);

export default router;