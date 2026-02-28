const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js")

const appointmentsRouter = require("./routers/appointmentsRouter.js")
const doctorRoutes = require("./routers/doctorRoutes.js")
const patientRoutes = require("./routers/patientRoutes.js")

dotenv.config();
connectDB();

const app = express();

// ✅ allow both local dev and production Vercel URL
const allowedOrigins = [
  "http://localhost:3000",
  "https://appointment-system-rho.vercel.app",
]

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin}`))
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/appointments", appointmentsRouter)
app.use("/api/doctors", doctorRoutes)
app.use("/api/patients", patientRoutes)

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Internal server error", error: err.message })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});