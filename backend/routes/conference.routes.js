import express from "express";
import Conference from "../models/Conference.js";
import Booking from "../models/Booking.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

// Create Conference (Admin)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const conf = await Conference.create(req.body);
    res.json(conf);
  }
);

// Get All Conferences (User + Admin)
router.get("/", authMiddleware, async (req, res) => {
  const conferences = await Conference.find();

  const enriched = await Promise.all(
    conferences.map(async (conf) => {
      const count = await Booking.countDocuments({
        conferenceId: conf._id
      });
      return { ...conf._doc, registrations: count };
    })
  );

  res.json(enriched);
});

// for admin cick view in admin panel , there i need it 
router.get(
  "/:id/registrations",
  authMiddleware,
  async (req, res) => {
    const bookings = await Booking.find({
      conferenceId: req.params.id
    }).populate("userId", "name email");

    res.json(bookings);
  }
);

// Delete Conference (Admin)
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    await Conference.findByIdAndDelete(req.params.id);
    res.json({ message: "Conference deleted" });
  }
);



// PUBLIC: Get feedback for a conference (for all logged-in users)
router.get(
  "/:id/feedback",
  authMiddleware,
  async (req, res) => {
    const feedbacks = await Booking.find({
      conferenceId: req.params.id,
      feedback: { $ne: "" }
    }).populate("userId", "name");

    res.json(feedbacks);
  }
);


export default router;
