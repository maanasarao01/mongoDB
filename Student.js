const mongoose=require('mongoose')

const student=new mongoose.Schema({
    name: String,
    rollNo: {
        type: Number,
        required: true
    },
    class: Number,
    grade: String,
    admissionDate: Date,
    address:{
        street: String,
        city: String
    }
})

module.exports=mongoose.model('Student',student)