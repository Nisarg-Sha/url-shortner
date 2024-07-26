import shortid from "shortid";
import URL from "../models/url";
import { Request, Response } from "express";

async function handleGenerateNewShortURL(req: Request, res: Response) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req: Request, res: Response) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result?.visitHistory.length,
    analytics: result?.visitHistory,
  });
}

export {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};