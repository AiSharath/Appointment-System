const mongoose = require("mongoose")

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age cannot be negative"],
      max: [150, "Age seems invalid"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
    },

    blood_type: {
      type: String,
      required: [true, "Blood type is required"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "Invalid blood type",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Please provide a valid email address",
      },
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["Active", "Critical", "Discharged", "Outpatient"],
        message: "Status must be Active, Critical, Discharged, or Outpatient",
      },
      default: "Active",
    },

    // ✅ back to String — frontend sends doctor name not ObjectId
    assigned_doctor: {
      type: String,
      required: [true, "Assigned doctor is required"],
      trim: true,
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Patient = mongoose.model("Patient", patientSchema)

module.exports = Patient