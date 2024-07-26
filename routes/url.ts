import express from "express";
import { handleGenerateNewShortURL, handleGetAnalytics } from "../controllers/url";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;