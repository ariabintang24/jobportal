import express from "express";
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  toggleCloseJob,
  getJobsEmployer,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.route("/").post(protect, createJob).get(getJobs);
router.route("/get-jobs-employer").get(protect, getJobsEmployer);
router
  .route("/:id")
  .get(getJobById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);
router.put("/:id/toggle-close", protect, toggleCloseJob);

export default router;
