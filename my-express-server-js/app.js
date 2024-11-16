import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import metricsRouter from "./routes/metrics.js";
import timeRouter from "./routes/time.js";
import cors from "cors";
import { corsConfig } from "./server-setup/cors-config.js";
import { authConfig } from "./server-setup/auth-config.js";

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(corsConfig);
app.use(authConfig);

app.use("/time", timeRouter);
app.use("/metrics", metricsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server started on: ", `http://localhost:${PORT}`);
});

export default app;
