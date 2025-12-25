import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';


// Routes
import authRoutes from "./routes/auth.routes.js";
import conferenceRoutes from "./routes/conference.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

dotenv.config();

const app = express();

/* =======================
   Middleware
======================= */
app.use(express.json());
app.use(cors());

/* =======================
   Routes
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/conferences", conferenceRoutes);
app.use("/api/bookings", bookingRoutes);

/* =======================
   Database Connection
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

/* =======================
   Server Start
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
