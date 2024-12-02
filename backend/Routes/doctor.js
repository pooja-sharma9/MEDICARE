import express from "express";
import {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from './review.js';

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRouter);

// Route to get a single doctor by ID
router.get("/:id", getSingleDoctor);

// Route to get all doctors
router.get("/", getAllDoctor);

// Route to update a doctor by ID
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);

// Route to delete a doctor by ID
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;