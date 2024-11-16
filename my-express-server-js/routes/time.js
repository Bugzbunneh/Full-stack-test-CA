import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  const currentEpochTime = Math.floor(new Date().getTime() / 1000);

  res.json({
    properties: {
      epoch: {
        description:
          "The current server time, in epoch seconds, at time of processing the request",
        type: "number",
        value: currentEpochTime,
      },
    },
    required: ["epoch"],
    type: "object",
  });
});

export default router;
