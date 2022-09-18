import app from "./app";

// Server config
const PORT = process.env.SERVER_PORT || 4000;
const HOSTNAME = process.env.SERVER_HOSTNAME || "http://localhost";

// start server
app.listen(PORT, () => {
  console.log(`Server running at ${HOSTNAME}:${PORT}`);
});
