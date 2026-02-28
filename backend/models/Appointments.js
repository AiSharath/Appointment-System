const mongoose = require("mongoose")

const appointmentSchema = mongoose.Schema(
  {
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,  // ✅ changed from patient_names (String) → proper reference
      ref: "Patient",
      required: [true, "Patient is required"],
    },

    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor is required"],
    },

    appointment_date: {
      type: Date,
      required: [true, "Appointment date is required"],
    },

    time_slot: {
      type: String,
      required: [true, "Time slot is required"],
      trim: true,
    },

    type: {
      type: String,
      enum: {
        values: ["Consultation", "Follow-up", "Checkup", "Emergency", "Surgery", "Lab Test", "Imaging"],
        message: "Invalid appointment type",
      },
      default: "Consultation",
    },

    status: {
      type: String,
      enum: {
        values: ["Scheduled", "In Progress", "Completed", "Cancelled"],
        message: "Invalid status",
      },
      default: "Scheduled",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment