import express from "express";
import Booking from "../models/Booking.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

// Book Conference
router.post("/", authMiddleware, async (req, res) => {
  const alreadyBooked = await Booking.findOne({
    userId: req.user.id,
    conferenceId: req.body.conferenceId
  });

  if (alreadyBooked)
    return res.status(400).json({ message: "Already booked" });

  const booking = await Booking.create({
    userId: req.user.id,
    conferenceId: req.body.conferenceId
  });

  res.json({ message: "Conference booked" });
});

// Get My Bookings
router.get("/my", authMiddleware, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id })
    .populate("conferenceId");
  res.json(bookings);
});



// import Booking from "../models/Booking.js"; // make sure Booking is imported
// import Conference from "../models/Conference.js";
// import { authMiddleware } from "../middleware/auth.js";

// router.get("/", authMiddleware, async (req, res) => {
//   const conferences = await Conference.find();

//   const enriched = await Promise.all(
//     conferences.map(async (conf) => {
//       // Find all bookings for this conference
//       const bookings = await Booking.find({ conferenceId: conf._id }).populate("userId", "name email");
      
//       // Map users from bookings
//       const users = bookings.map(b => ({ _id: b.userId._id, name: b.userId.name }));
      
//       return { ...conf._doc, registrations: users };
//     })
//   );

//   res.json(enriched);
// });



// feedback

// Add feedback (USER)
router.put(
  "/:bookingId/feedback",
  authMiddleware,
  async (req, res) => {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    // User can only add feedback to their own booking
    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    booking.feedback = req.body.feedback;
    await booking.save();

    res.json({ message: "Feedback added" });
  }
);

// Delete feedback (USER)
router.delete(
  "/:bookingId/feedback",
  authMiddleware,
  async (req, res) => {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    booking.feedback = "";
    await booking.save();

    res.json({ message: "Feedback deleted" });
  }
);


// Delete feedback (ADMIN)
router.delete(
  "/admin/:bookingId/feedback",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    booking.feedback = "";
    await booking.save();

    res.json({ message: "Feedback removed by admin" });
  }
);
export default router; 