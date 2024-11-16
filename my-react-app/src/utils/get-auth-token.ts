export const getAuthToken = () => {
  const plainToken = "mysecrettoken";
  const base64EncodedToken = Buffer.from(plainToken).toString("base64");

  return base64EncodedToken;
};
