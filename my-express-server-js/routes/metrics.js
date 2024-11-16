import express from "express";
import promClient from "prom-client";
const router = express.Router();

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

router.get("/", async (req, res, next) => {
  res.set("Content-Type", promClient.register.contentType);
  const metrics = await promClient.register.metrics();

  res.json(metrics);
});

export default router;
