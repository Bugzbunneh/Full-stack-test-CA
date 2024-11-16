import { AUTH_TOKEN } from "../constants/auth.js";

export const authConfig = (req, res, next) => {
  const incomingAuthToken = req.headers.authorization;

  if (!incomingAuthToken) {
    return res.status(403).json({ error: "No token provided" });
  }

  // Ignore Basic prefix
  const encodedToken = incomingAuthToken.split(" ")[1];

  const decodedToken = Buffer.from(encodedToken, "base64").toString("ascii");

  if (decodedToken !== AUTH_TOKEN) {
    return res.status(403).json({ error: "Incorrect authorization token" });
  }

  next();
};
