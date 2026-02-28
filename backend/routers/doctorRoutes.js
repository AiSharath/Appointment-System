const express=require("express")
const router=express.Router()

const{
    createDoctor,
    findDoctors,
    findDoctorById,
    deleteDoctorById
}=require("../controllers/docterController.js");

router.post("/",createDoctor)

router.get("/",findDoctors)

router.get("/:id",findDoctorById)

router.delete("/:id",deleteDoctorById)

module.exports=router
