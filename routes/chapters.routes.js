import express from "express";
import multer from "multer";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { getChapterForId, uploadChapters,getChapters } from "../controllers/chapters.controller.js";
import redisClientMiddleware from "../middleware/redisClient.middleware.js";

const router = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// POST /api/v1/chapters - Upload chapters JSON file
router.post('/chapters', upload.single('file'), isAdmin,uploadChapters);

router.get("/chapters/:id",getChapterForId);

// GET /api/v1/chapters - Retrieve chapters with filters and pagination
router.get('/chapters',redisClientMiddleware,getChapters);

export default router;