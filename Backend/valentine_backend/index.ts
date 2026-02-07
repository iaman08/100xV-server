
import express from "express";
import cors from "cors";
import referralRoutes from "./routes/referral";
import userRoutes from "./routes/user";
import registerRoutes from "./routes/register";
import openUserRoutes from "./routes/openuser";

import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration - allow frontend origins
const corsOptions = {
  origin: [
    "http://localhost:8080",
    "http://localhost:5173",
    "http://127.0.0.1:8080",
    // Production domain from environment variable
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[],
  credentials: true, // Allow cookies to be sent
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Health check endpoint - MUST be before other routes
app.get("/", (req, res) => {
  res.send("Hello via Bun + Express!");
});

// Use routes
app.use("/", referralRoutes);
app.use("/", userRoutes);
app.use("/", registerRoutes);
app.use("/", openUserRoutes);

// Bind to 0.0.0.0 for Railway (required for external access)
app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});