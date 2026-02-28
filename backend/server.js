const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");                          // ✅ import cors
const connectDB = require("./config/db.js")

const appointmentsRouter = require("./routers/appointmentsRouter.js")
const doctorRoutes = require("./routers/doctorRoutes.js")
const patientRoutes = require("./routers/patientRoutes.js")

dotenv.config();
connectDB();

const app = express();

// ✅ CORS must come BEFORE routes
app.use(cors({
  origin: "http://localhost:3000",   
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// ✅ Fixed: plural routes to match frontend services
app.use("/api/appointments", appointmentsRouter)
app.use("/api/doctors", doctorRoutes)       
app.use("/api/patients", patientRoutes)    

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});