import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import connectDB from "./config/db.js";
import { seedInitialData } from "./config/seeder.js";
import { startMeterSimulator } from "./services/meterSimulator.js";


import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import meterRoutes from "./routes/meterRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";
import matchingRoutes from "./routes/matchingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import disputeRoutes from "./routes/disputeRoutes.js";


dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  },
});

const corsOptions = {
  origin: (origin, callback) => {
    // Allow any origin during development & production deployments (Vercel, Localhost, Render)
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Make io available to controllers later (e.g. broadcasting live meter/grid data)
app.set("io", io);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/meter", meterRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/disputes", disputeRoutes);


// Central error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedInitialData();
  startMeterSimulator();

  server.listen(PORT, () => {
    console.log(`SolarShare server running on port ${PORT}`);
  });
});
