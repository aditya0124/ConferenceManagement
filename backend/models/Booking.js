// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   conferenceId: { type: mongoose.Schema.Types.ObjectId, ref: "Conference" },
//   feedback: String
// });

// export default mongoose.model("Booking", bookingSchema);

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    conferenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conference",
      required: true
    },
    feedback: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);


// import mongoose from "mongoose";
// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User"
//     },
//     conferenceId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Conference"
//     },
//     feedback: {
//       type: String,
//       default: ""
//     }
//   },
//   { timestamps: true }
// );
// export default mongoose.model("Booking", bookingSchema);
