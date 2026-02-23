const express=require("express")
const router=express.Router()

const {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}=require("../controllers/appointmentsController.js")


router.post("/",createAppointment)

router.get("/",getAllAppointments)

router.get("/:id",getAppointmentById)

router.post("/:id",updateAppointment)

router.delete("/:id",deleteAppointment)

module.exports=router;