const Doctor=require("../models/Doctor.js")


async function createDoctor(req,res){
    try{
        const doctor=await Doctor.create(req.body);
        res.status(201).json(doctor)
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

async function findDoctors(req,res){
    try{
        const doctors=await Doctor.find();
        res.status(200).json(doctors)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

async function findDoctorById(req,res){
    try{
        const doctor=await Doctor.findById(req.params.id);

        if(!doctor){
            res.status(404).json({message:"Doctors not found"})
            return;
        }
        res.status(200).json(doctor);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


module.exports={
    createDoctor,
    findDoctors,
    findDoctorById
};