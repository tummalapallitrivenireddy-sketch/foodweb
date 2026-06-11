import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
  customerName: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  pickupLocation: {
    type: String,
    required: true,
  },

  dropLocation: {
    type: String,
    required: true,
  },

  vehicleType: {
    type: String,
    default: "Truck",
  },

  status: {
    type: String,
    default: "Pending",
  },
},
{
  timestamps: true,
}
);

export default mongoose.model("Booking", bookingSchema);