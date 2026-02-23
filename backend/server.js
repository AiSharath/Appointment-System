const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db.js")

const appointmentsRouter=require("./routers/appointmentsRouter.js")
const doctorRoutes=require("./routers/doctorRoutes.js")
const patientRoutes=require("./routers/patientRoutes.js")


dotenv.config();
connectDB();

const app=express();

app.use(express.json());


app.use("/api/appointments",appointmentsRouter)
app.use("/api/doctor",doctorRoutes)
app.use("/api/patient",patientRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`App running on ${PORT}`);
})