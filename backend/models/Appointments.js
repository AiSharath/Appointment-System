const mongoose=require("mongoose")

const appointmentSchema=mongoose.Schema({
    patient_names:{
        type:String,
        required:true
    },
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    appointment_date:{
        type:Date,
        required:true
    }
},
{
    timestamps:true
}
);

const Appointment=mongoose.model("Appointment",appointmentSchema);

module.exports=Appointment;