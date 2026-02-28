const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },

    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
      // ✅ No enum — accepts any specialization string freely
    },

    availability: {
      type: String,
      required: [true, "Availability is required"],
      enum: {
        values: ["Available", "Unavailable", "On Leave"],
        message: "Availability must be: Available, Unavailable, or On Leave",
      },
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
)

const Doctor = mongoose.model("Doctor", doctorSchema)

module.exports = Doctor