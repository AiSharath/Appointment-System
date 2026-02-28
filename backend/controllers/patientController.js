const Patient = require("../models/Patient.js")

async function createPatient(req, res) {
  try {
    console.log("Received body:", req.body)   // ✅ shows exactly what frontend sent
    const patient = await Patient.create(req.body)
    res.status(201).json(patient)
  } catch (error) {
    console.log("Create error:", error.message) // ✅ shows exact MongoDB error
    res.status(400).json({ error: error.message })
  }
}

async function getAllPatients(req, res) {
  try {
    const patients = await Patient.find()
    res.status(200).json(patients)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function getPatientById(req, res) {
  try {
    const patient = await Patient.findById(req.params.id)
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" })
    }
    res.status(200).json(patient)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function updatePatient(req, res) {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" })
    }
    res.status(200).json(patient)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function deletePatient(req, res) {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id)
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" })
    }
    res.status(200).json({ message: "Patient record deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
}