const express=require("express")
const router=express.Router()

const{
    createDoctor,
    findDoctors,
    findDoctorById
}=require("../controllers/docterController.js");

router.post("/",createDoctor)

router.get("/",findDoctors)

router.get("/:id",findDoctorById)

module.exports=router
