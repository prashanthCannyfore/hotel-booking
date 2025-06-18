import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: String, ref: "User", required: true },
    room: { type: String, ref: "Room", required: true },
    hotel: { type: String, ref: "Hotel", required: true },
    checkINDate: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, requride: true },
    guests: { type: Number, required: true },
    status: { type: String, enum:["pending", "confirmed", "cancelled"],default: "pending",},
    paymentMethod: {
        type: String,
        requrired: true,
        default: "Pay At Hotel",
    },
    ispaid: {type: Boolean, default:"false"},
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
